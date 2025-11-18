import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ListOrdered />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
];

function MenuItems() {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          className="flex items-center gap-2 px-3 py-2 text-lg rounded-md cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
          key={menuItem.id}
          onClick={() => navigate(menuItem.path)}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <>
      <aside className="flex-col hidden w-64 p-6 border-r bg-background lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={25} />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}

export default AdminSidebar;
