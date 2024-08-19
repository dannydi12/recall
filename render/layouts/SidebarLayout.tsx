import Sidebar from "@/components/Sidebar";
import { Card } from "@/system/ui/card";
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
        <div className="pt-0">
          <div className="bg-slate-900 px-8 py-4">
            <h1>{title}</h1>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
