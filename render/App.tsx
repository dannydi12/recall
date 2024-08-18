import React, { useEffect } from "react";
import { Button } from "@/system/ui/button";
import { query } from "./utils/network";

const App: React.FC = () => {
  useEffect(() => {
    const a = async () => {
      const res = await query("SELECT * FROM bookmarks WHERE id = ?", 1);
      console.log(res, "res");
    };
    a();
  }, []);

  return (
    <>
      <h1>Hello, Electron with React?</h1>
      <Button>Hey</Button>
    </>
  );
};

export default App;
