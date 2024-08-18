import { Link, useLocation } from "react-router-dom";
import ROUTES from "@/utils/routes";

import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <div className="border-r">
      <nav className="grid gap-4 text-sm text-muted-foreground pr-4">
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
    </div>
  );
};

export default Sidebar;
