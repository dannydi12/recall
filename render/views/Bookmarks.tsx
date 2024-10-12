import SidebarLayout from "@/layouts/SidebarLayout";
import FileInputButton from "@/system/ui/file-input-button";
import { FC } from "react";

const Bookmarks: FC = () => {
  const handleImport = (path: string) => {
    backend.import(path);
  };

  return (
    <SidebarLayout
      title="Bookmarks"
      buttons={
        <FileInputButton
          onChange={(e) => handleImport(e.target.files[0].path)}
        />
      }
    >
      hi
    </SidebarLayout>
  );
};

export default Bookmarks;
