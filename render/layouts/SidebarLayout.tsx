import Sidebar from "@/components/Sidebar";
import { Large } from "@/system/ui/typegraphy";
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
          <div className="border-b px-8 py-4 dark:bg-slate-900">
            <Large>{title}</Large>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
