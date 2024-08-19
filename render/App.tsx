import React, { useEffect } from "react";
import { Button } from "@/system/ui/button";
import { query } from "./utils/network";
import SidebarLayout from "./layouts/SidebarLayout";

const App: React.FC = () => {
  useEffect(() => {
    const a = async () => {
      const res = await query("SELECT * FROM bookmarks WHERE id = ?", 1);
      console.log(res, "res");
    };
    a();
  }, []);

  return (
    <SidebarLayout title="dashboard">
      <h1>Hello, Electron with React?</h1>
      <Button>Hey</Button>
    </SidebarLayout>
  );
};

export default App;
