import { Button } from "@/components/ui/button";
import { logoutUser } from "@/features/auth/authSlice";
import { LogOut, TextAlignJustify } from "lucide-react";
import { useDispatch } from "react-redux";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  return (
    <header className="flex items-center justify-between px-3 py-4 ">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <TextAlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex justify-end flex-1 ">
        <Button
          onClick={ ()=> dispatch(logoutUser())}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
