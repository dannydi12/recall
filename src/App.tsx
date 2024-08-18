import React from "react";
import { Button } from "@/system/ui/button";
import { ModeToggle } from "./system/mode-toggle";
import { Card } from "./system/ui/card";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <Card className="p-4">
        <ModeToggle />
      </Card>
      <h1>Hello, Electron with React?</h1>
      <Button>Hey</Button>
    </div>
  );
};

export default App;
