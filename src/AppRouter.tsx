import { createBrowserRouter } from "react-router-dom";
import Providers from "./Providers";
import App from "./App";
import ROUTES from "./utils/routes";
import Settings from "./views/Settings";
import SidebarLayout from "./layouts/SidebarLayout";

const router = createBrowserRouter([
  {
    path: ROUTES.base,
    element: <Providers />,
    children: [
      {
        path: ROUTES.base,
        element: <SidebarLayout />,
        children: [
          { path: ROUTES.base, element: <App /> },
          { path: ROUTES.settings, element: <Settings /> },
        ],
      },
    ],
  },
]);

export default router;
