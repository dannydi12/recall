import { Bookmark, Folder } from "@/utils/allBookmarks";
import { FC } from "react";
import SidebarFolder from "./SidebarFolder";
import SidebarBookmark from "./SidebarBookmark";

type Props = {
  items: (Bookmark | Folder)[];
};

const SidebarItems: FC<Props> = ({ items }) => {
  return items.map((item) => {
    if (item.type === "bookmark") {
      return <SidebarBookmark key={item.id} item={item} />;
    }

    return <SidebarFolder key={item.id} item={item} />;
  });
};

export default SidebarItems;
