import CartItemsContent from "@/components/shopping-view/CartItemsContent";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Rat } from "lucide-react";

function UserCartWrapper({ cartItems }) {
  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, cartItem) =>
            sum +
            (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
              cartItem.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md p-6">
      <SheetHeader>
        <SheetTitle className="font-bold text-2xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-3 space-y-4 ">
        {cartItems && cartItems.length ? (
          cartItems.map((cartItem) => <CartItemsContent cartItem={cartItem} />)
        ) : (
          <span className="text-lg font-bold">
            <Rat className="h-6 w-6" /> Seems Your Cart is Empty...{" "}
          </span>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button className="w-full mt-6">CheckOut</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
