import { Link, useLocation } from "react-router-dom";
import ROUTES from "@/utils/routes";
import { ModeToggle } from "@/system/mode-toggle";

import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col border-r pr-4">
      <nav className="grid gap-4 text-sm text-muted-foreground">
        <Link
          to={ROUTES.base}
          className={cn({
            "font-semibold text-primary": pathname === ROUTES.base,
          })}
        >
          Dashboard
        </Link>
        <Link
          className={cn({ "font-semibold text-primary": pathname === "#" })}
          to="#"
        >
          Bookmarks
        </Link>
        <Link
          className={cn({
            "font-semibold text-primary": pathname === ROUTES.settings,
          })}
          to={ROUTES.settings}
        >
          Settings
        </Link>
      </nav>
      <div className="mb-0 mt-auto">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
