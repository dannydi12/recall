import { cn } from "@/lib/utils";
import { Bookmark } from "@/utils/allBookmarks";
import { Link } from "lucide-react";
import { FC } from "react";

type Props = {
  item: Bookmark;
};

const SidebarBookmark: FC<Props> = ({ item }) => {
  const isActive = false;
  return (
    <button
      className={cn(
        isActive && "font-semibold text-primary",
        "flex items-center gap-2",
      )}
      onClick={() => openExternalLink(item.link)}
    >
      <Link
        className={cn(
          isActive ? "stroke-primary" : "stroke-muted-foreground",
          "min-w-4",
        )}
        size={16}
      />
      <p className="truncate">{item.name}</p>
    </button>
  );
};

export default SidebarBookmark;
