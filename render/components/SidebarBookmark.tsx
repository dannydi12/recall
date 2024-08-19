import { cn } from "@/lib/utils";
import { Bookmark } from "@/utils/allBookmarks";
import { Wrench } from "lucide-react";
import { FC } from "react";

type Props = {
  item: Bookmark;
};

const SidebarBookmark: FC<Props> = ({ item }) => {
  const isActive = false;
  return (
    <div
      className={cn(
        isActive && "font-semibold text-primary",
        "flex items-center gap-3",
      )}
    >
      <Wrench
        className={isActive ? "fill-primary" : "fill-muted-foreground"}
        size={16}
      />
      <p className="truncate">{item.name}</p>
    </div>
  );
};

export default SidebarBookmark;
