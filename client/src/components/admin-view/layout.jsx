import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Admin sidebar */}
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        {/* Admin Header */}
        <AdminHeader />
        <main className="flex flex-1 p-4 bg-muted/40 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
