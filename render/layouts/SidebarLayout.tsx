import Sidebar from "@/components/Sidebar";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const SidebarLayout: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <div className="grid h-[100vh] grid-cols-[180px_1fr]">
        <Sidebar />
        <div className="p-4 pt-0">
          <div>
            <h1>{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
