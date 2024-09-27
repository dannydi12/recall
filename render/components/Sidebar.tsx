import ROUTES from "@/utils/routes";
import { ModeToggle } from "@/system/mode-toggle";
import { Bookmark, LayoutDashboard, Wrench } from "lucide-react";
import { FC } from "react";
import SidebarLink from "./SidebarLink";
import useBookmarkTree from "@/hooks/useBookmarkTree";
import SidebarItems from "./SidebarItems";

const Sidebar: FC = () => {
  const { bookmarks } = useBookmarkTree();

  return (
    <div className="flex max-h-[100vh] flex-col overflow-y-auto border-r p-4">
      <nav className="grid gap-4 text-sm text-muted-foreground">
        <SidebarLink
          label="Dashboard"
          to={ROUTES.base}
          Icon={LayoutDashboard}
        />
        <SidebarLink label="Bookmarks" to={ROUTES.bookmarks} Icon={Bookmark} />
        <SidebarLink label="Settings" to={ROUTES.settings} Icon={Wrench} />
      </nav>
      <div className="mt-10 text-sm text-muted-foreground">
        <p className="text-xs font-semibold uppercase">Quick Draw</p>
        <div className="mt-3 flex flex-col gap-2">
          <SidebarItems items={bookmarks} />
        </div>
      </div>
      <div className="mb-0 mt-auto">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
