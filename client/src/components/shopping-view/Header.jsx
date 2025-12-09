import UserCartWrapper from "@/components/shopping-view/UserCartWrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { shoppingViewHeaderMenuItems } from "@/config/formConfig";
import { logoutUser } from "@/features/auth/authSlice";
import { fetchCartItems } from "@/features/shopping/cartSlice";
import { CircleUser, Home, LogOut, Menu, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

function MenuItems() {
  const navigate = useNavigate();

  function handleNavigate(item) {
    sessionStorage.removeItem("filters");
    let filter = item.id !== "home" ? { category: [item.id] } : null;
    sessionStorage.setItem("filters", JSON.stringify(filter));
    navigate(item.path);
  }

  return (
    <nav className="flex flex-col gap-6 mb-3 lg:flex-row lg:mb-0 lg:items-center">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label
          key={item.id}
          className={"text-sm font-medium hover:underline cursor-pointer"}
          onClick={() => handleNavigate(item)}
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?._id));
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User Shopping Cart</span>
        </Button>
        <UserCartWrapper cartItems={cartItems} />
      </Sheet>

      <DropdownMenu asChild>
        <DropdownMenuTrigger className=" w-fit">
          <Avatar className="bg-black border-none">
            <AvatarFallback className="font-semibold text-white bg-black">
              {user?.userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="w-56">
          <DropdownMenuLabel>
            Logged In As{" "}
            <span className="font-extrabold underline ">
              {user?.userName.toUpperCase()}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shopping/account")}
            className="cursor-pointer "
          >
            <CircleUser className="w-6 h-6 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer ">
            <LogOut className="w-6 h-6 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/shopping/home" className="flex items-center gap-2">
          <Home className="w-6 h-6" />
          <span className="font-bold">Ecommmerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6 ">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
