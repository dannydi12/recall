import { Folder } from "@/utils/allBookmarks";
import { FC, useState } from "react";
import SidebarItems from "./SidebarItems";
import { ChevronRight, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  item: Folder;
};
const SidebarFolder: FC<Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = false;
  return (
    <>
      <div
        className={cn(
          isActive && "font-semibold text-primary",
          "flex items-center gap-3",
        )}
      >
        <FolderIcon
          className={isActive ? "fill-primary" : "fill-muted-foreground"}
          size={16}
        />
        <p className="truncate">{item.name}</p>
        <button
          className={cn(
            "ml-auto transition-transform",
            isOpen ? "rotate-90" : "rotate-0",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 pl-2">
          <SidebarItems items={item.children} />
        </div>
      )}
    </>
  );
};

export default SidebarFolder;
