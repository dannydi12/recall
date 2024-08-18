import { Link } from "react-router-dom";
import ROUTES from "@/utils/routes";

import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground border-r pr-4">
      <Link to={ROUTES.base} className="font-semibold text-primary">
        Dashboard
      </Link>
      <Link to="#">Bookmarks</Link>
      <Link to={ROUTES.settings}>Settings</Link>
    </nav>
  );
};

export default Sidebar;
