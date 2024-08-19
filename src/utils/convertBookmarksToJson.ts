import fs from "fs";
import cheerio, { Cheerio } from "cheerio";

// Define the structure for the JSON output
interface Bookmark {
  title: string;
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
