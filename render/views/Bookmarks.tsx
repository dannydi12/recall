import SidebarLayout from "@/layouts/SidebarLayout";
import FileInput from "@/system/ui/file-input";
import { FC } from "react";

const Bookmarks: FC = () => {
  const handleImport = (path: string) => {
    backend.import(path);
  };

  return (
    <SidebarLayout title="Bookmarks">
      Bookmarks
      <FileInput onChange={(e) => handleImport(e.target.files[0].path)} />
    </SidebarLayout>
  );
};

export default Bookmarks;
