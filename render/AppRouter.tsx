import { createBrowserRouter } from "react-router-dom";
import Providers from "../src/Providers";
import App from "./App";
import ROUTES from "./utils/routes";
import Settings from "./views/Settings";

const router = createBrowserRouter([
  {
    path: ROUTES.base,
    element: <Providers />,
    children: [
      { path: ROUTES.base, element: <App /> },
      { path: ROUTES.settings, element: <Settings /> },
    ],
  },
]);

export default router;
