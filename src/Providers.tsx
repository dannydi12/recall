import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../render/system/theme-provider";

const Providers: FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
};

export default Providers;
