import fs from "fs";
import cheerio, { Cheerio } from "cheerio";
import { db } from "./db";

// Define the structure for the JSON output
interface Bookmark {
  title: string;
  parentFolderTitle?: string;
  href?: string;
  addDate?: string;
  type: "folder" | "link";
  lastModified?: string;
  icon?: string;
  children?: Bookmark[];
}

// Function to parse NETSCAPE-Bookmark-file and convert to JSON
export const convertBookmarksToJSON = (filePath: string): Bookmark[] => {
  const content = fs.readFileSync(filePath, "utf8");

  // Load the content into cheerio for parsing
  const $ = cheerio.load(content);

  const parseBookmarks = (dlElement: Cheerio<any>): Bookmark[] => {
    const bookmarks: Bookmark[] = [];

    // gather all links at this level in the tree
    dlElement
      .children("DT")
      .children("a")
      .each((_, dt) => {
        const a = $(dt);

        const linkTitle = a.text();
        const href = a.attr("href");
        const addDate = a.attr("add_date");
        const icon = a.attr("icon");

        bookmarks.push({
          title: linkTitle,
          href,
          type: "link",
          addDate,
          icon,
        });
      });

    // analyze folders recursively
    dlElement
      .children("DT")
      .children("H3")
      .each((_, dt1) => {
        const h3 = $(dt1);

        const folderTitle = h3.text();
        const addDate = h3.attr("add_date");
        const lastModified = h3.attr("last_modified");

        const childrenDL = $(dt1).next("DL");
        const children = parseBookmarks(childrenDL);

        bookmarks.push({
          title: folderTitle,
          addDate,
          type: "folder",
          lastModified,
          children,
        });
      });

    return bookmarks;
  };

  // visualizer helpful for debugging schema
  // const visualize = (el: Cheerio<any>) => {
  //   const v: any = {};
  //   v.name = el.prop("name");

  //   if (el.children().length) {
  //     const children: any[] = [];
  //     el.children().each((_, newEl) => {
  //       children.push(visualize($(newEl)));
  //     });
  //     v.children = children;
  //   }

  //   return v;
  // };

  // Start parsing from the root DL element
  const root = $("DL").first();
  return parseBookmarks(root);
};

export const insertBookmarks = async (bookmarksToInsert: Bookmark[]) => {
  const folderIdMap = new Map();
  const { bookmarks, folders } = flattenBookmarks(bookmarksToInsert);

  // console.log(bookmarks, folders);
  console.log("here-1");

  const insertFolder = db.prepare(`
    INSERT INTO folders (name, modified_date, folder_id)
    VALUES (?, ?, ?)
  `);

  console.log("here");

  const insertBookmark = db.prepare(`
    INSERT INTO bookmarks (name, folder_id, link, icon, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  console.log("here2");

  // Create a transaction to batch insert the bookmarks
  const insertMany = db.transaction<
    (bookmarks: Bookmark[], folders: Bookmark[]) => void
  >((bookmarks, folders) => {
    for (const folder of folders) {
      const parentFolderId = folderIdMap.get(folder.parentFolderTitle || "");
      const result = insertFolder.run(
        folder.title || null,
        folder.lastModified
          ? new Date(parseInt(folder.lastModified) * 1000).toISOString()
          : null,
        parentFolderId || null,
      );
      const folderId = result.lastInsertRowid;
      folderIdMap.set(folder.title, folderId);
    }

    for (const bookmark of bookmarks) {
      const folderId = folderIdMap.get(bookmark.parentFolderTitle || "");

      insertBookmark.run(
        bookmark.title || null,
        folderId || null,
        bookmark.href || null,
        bookmark.icon || null,
        bookmark.addDate
          ? new Date(parseInt(bookmark.addDate) * 1000).toISOString()
          : null,
      );
    }
  });

  // Execute the transaction
  insertMany(bookmarks, folders);
};

function flattenBookmarks(bookmarksNested: Bookmark[]) {
  const stack = [...bookmarksNested];
  const folders = [];
  const bookmarks = [];

  while (stack.length > 0) {
    const bookmark = stack.pop();

    bookmark.type === "folder"
      ? folders.push(bookmark)
      : bookmarks.push(bookmark);

    if (bookmark.children) {
      const children = bookmark.children.map((child) => ({
        ...child,
        parentFolderTitle: bookmark.title,
      }));

      stack.push(...children);
    }
  }

  return { folders, bookmarks };
}
