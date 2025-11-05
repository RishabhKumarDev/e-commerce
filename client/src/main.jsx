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

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: AuthLayout,
        children: [
          { path:"login",  Component: AuthLogin },
          { path: "register", Component: AuthRegister },
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
