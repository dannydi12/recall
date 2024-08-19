import React, { useEffect } from "react";
import { Button } from "@/system/ui/button";
import SidebarLayout from "./layouts/SidebarLayout";
import { getBookmarkTree } from "./utils/allBookmarks";

const App: React.FC = () => {
  useEffect(() => {
    const a = async () => {
      const nestedData = await getBookmarkTree();
      console.log(nestedData);
    };
    a();
  }, []);

  return (
    <SidebarLayout title="Dashboard">
      <h1>Hello, Electron with React?</h1>
      <Button>Hey</Button>
    </SidebarLayout>
  );
};

export default App;
