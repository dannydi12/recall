export interface Folder {
  id: number;
  type: "folder";
  name: string;
  folder_id?: number;
  modified_date: string;
  folder_index?: number;
  children?: (Bookmark | Folder)[];
}

export interface Bookmark {
  id: number;
  type: "bookmark";
  name?: string;
  folder_id?: number;
  ai_summary?: string;
  link: string;
  icon?: string;
  last_opened?: string;
  bookmark_index?: number;
  favorited?: boolean;
  downloaded_content_path?: string;
  note?: string;
  ai_tags?: string;
  created_at: string;
}

export const getBookmarkTree = async () => {
  // Fetch all folders
  const folders = (await backend.list(`SELECT * FROM folders`)) as Folder[];

  // Fetch all bookmarks
  const bookmarks = (await backend.list(
    `SELECT * FROM bookmarks`,
  )) as Bookmark[];

  const buildTree = (
    folders: Folder[],
    bookmarks: Bookmark[],
    parentId: number | null = null,
  ) => {
    // get this level folders
    const folderChildren = folders
      .filter((folder) => folder.folder_id === parentId)
      .map((folder) => ({ ...folder, type: "folder" as const }));

    // enter into folders
    for (const childFolder of folderChildren) {
      const nestedItems = buildTree(folders, bookmarks, childFolder.id);
      childFolder.children = nestedItems;
    }

    // get this level links
    const folderBookmarks = bookmarks
      .filter((bookmark) => bookmark.folder_id === parentId)
      .map((bookmark) => ({ ...bookmark, type: "bookmark" as const }));

    // combine
    return [...folderChildren, ...folderBookmarks];
  };

  return buildTree(folders, bookmarks, null);
};
