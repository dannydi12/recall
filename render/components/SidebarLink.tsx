import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  to: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const SidebarLink: FC<Props> = ({ to, label, Icon }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      className={cn(
        isActive && "font-semibold text-primary",
        "flex items-center gap-2",
      )}
      to={to}
    >
      <Icon
        className={isActive ? "fill-primary" : "fill-muted-foreground"}
        size={16}
      />
      {label}
    </Link>
  );
};

export default SidebarLink;
