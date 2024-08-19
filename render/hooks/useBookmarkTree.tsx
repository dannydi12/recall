import { Bookmark, Folder, getBookmarkTree } from "@/utils/allBookmarks";
import { useEffect, useState } from "react";

const useBookmarkTree = () => {
  const [bookmarks, setBookmarks] = useState<(Bookmark | Folder)[]>([]);

  const getBookmarks = async () => {
    const result = await getBookmarkTree();
    setBookmarks(result);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return { bookmarks };
};

export default useBookmarkTree;
