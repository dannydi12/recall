import ROUTES from "@/utils/routes";
import { ModeToggle } from "@/system/mode-toggle";
import { Bookmark, LayoutDashboard, Wrench } from "lucide-react";
import { FC } from "react";
import SidebarLink from "./SidebarLink";

const Sidebar: FC = () => {
  return (
    <div className="flex flex-col border-r p-4">
      <nav className="grid gap-4 text-sm text-muted-foreground">
        <SidebarLink
          label="Dashboard"
          to={ROUTES.base}
          Icon={LayoutDashboard}
        />
        <SidebarLink label="Bookmarks" to={ROUTES.bookmarks} Icon={Bookmark} />
        <SidebarLink label="Settings" to={ROUTES.settings} Icon={Wrench} />
      </nav>
      <div className="mb-0 mt-auto">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
