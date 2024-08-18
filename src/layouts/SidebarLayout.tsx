import Sidebar from "@/components/Sidebar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const SidebarLayout: FC = () => {
  return (
    <div className="grid h-[100vh] grid-cols-[180px_1fr] p-4">
      <Sidebar />
      <div className="p-4 pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
