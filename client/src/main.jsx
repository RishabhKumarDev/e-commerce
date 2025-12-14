import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import "./index.css";

// components...
import App from "./App.jsx";
import AuthLogin from "./pages/auth/login";
import AuthLayout from "./components/auth/Layout";
import AuthRegister from "./pages/auth/Register";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import AdminLayout from "./components/admin-view/layout";
import AdminFeatures from "./pages/admin-view/Features";
import ShoppingLayout from "./components/shopping-view/Layout";
import NotFoundPage from "./pages/not-found/Index";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingAccount from "./pages/shopping-view/Account";
import ShoppingListing from "./pages/shopping-view/Listing";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import CheckAuth from "./components/common/CheckAuth";
import AdminDashboard from "./pages/admin-view/Dashboard";
import Unauthorized from "./pages/un-auth/Unauthorized";
import { Toaster } from "@/components/ui/sonner";
import PaypalReturn from "@/pages/shopping-view/PaypalReturn";
import PaypalCancle from "@/pages/shopping-view/PaypalCancle";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CheckAuth>
        <App />
      </CheckAuth>
    ),
    ErrorBoundary: NotFoundPage,
    children: [
      { path: "/unauth-page", Component: Unauthorized },
      {
        ErrorBoundary: NotFoundPage,
        children: [
          // Auth Section
          {
            Component: AuthLayout,
            children: [
              { path: "login", Component: AuthLogin },
              { path: "register", Component: AuthRegister },
            ],
          },
          // Admin Section
          {
            ErrorBoundary: NotFoundPage,
            path: "/admin",
            Component: AdminLayout,
            children: [
              { path: "dashboard", Component: AdminDashboard },
              { path: "orders", Component: AdminOrders },
              { path: "products", Component: AdminProducts },
              { path: "features", Component: AdminFeatures },
            ],
          },
          // Shopping Section
          {
            path: "/shopping",
            Component: ShoppingLayout,
            children: [
              {
                ErrorBoundary: NotFoundPage,
                children: [
                  { path: "home", Component: ShoppingHome },
                  { path: "checkout", Component: ShoppingCheckout },
                  { path: "listing", Component: ShoppingListing },
                  { path: "account", Component: ShoppingAccount },
                  { path: "paypal-return", Component: PaypalReturn },
                  { path: "paypal-cancel", Component: PaypalCancle },
                ],
              },
            ],
          },
          // Catch route -- Not found route;
          { path: "*", Component: NotFoundPage },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </Provider>
  </StrictMode>
);
