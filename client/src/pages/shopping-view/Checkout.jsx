import banner3 from "@/assets/banner1.jpg";
import Address from "@/components/shopping-view/Address";
import CartItemsContent from "@/components/shopping-view/CartItemsContent";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  console.log(cartItems, " cart itmes");
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
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={banner3}
          className="object-cover object-center w-full h-full "
        />
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 mt-5 sm:grid-cols-2">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => (
                <CartItemsContent cartItem={item} key={item._id} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full" >Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
