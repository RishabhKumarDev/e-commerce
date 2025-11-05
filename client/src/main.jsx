import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

// components...
import App from "./App.jsx";
import AuthLogin from "./pages/auth/login";
import AuthLayout from "./components/auth/Layout";
import AuthRegister from "./pages/auth/Register";
import AdimnDashboard from "./pages/admin-view/Dashboard";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Projucts";
import AdminLayout from "./components/admin-view/layout";
import AdminFeatures from "./pages/admin-view/Features";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: AuthLayout,
        children: [
          { path: "login", Component: AuthLogin },
          { path: "register", Component: AuthRegister },
        ],
      },
      {
        path: "/admin",
        Component: AdminLayout,
        children: [
          { path: "dashboard", Component: AdimnDashboard },
          { path: "orders", Component: AdminOrders },
          { path: "products", Component: AdminProducts },
          { path: "features", Component: AdminFeatures },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
