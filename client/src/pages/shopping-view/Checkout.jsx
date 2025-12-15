import banner3 from "@/assets/banner1.jpg";
import Address from "@/components/shopping-view/Address";
import CartItemsContent from "@/components/shopping-view/CartItemsContent";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/features/shopping/orderSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function ShoppingCheckout() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const { cartItems, cartId } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrder);
  const dispatch = useDispatch();

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

  const handleOrderCreation = async () => {
    if (cartItems.length === 0) {
      toast.warning("Cart is Empty. Please add items to proceed.");
      return;
    }

    if (selectedAddress === null) {
      toast.warning("Please Select a Address to Proceed.");
      return;
    }
    const orderData = {
      userId: user?._id,
      cartId,
      cartItems: cartItems.map((item) => ({
        productId: item?._id,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      address: {
        addressId: selectedAddress?._id,
        address: selectedAddress?.address,
        city: selectedAddress?.city,
        pincode: selectedAddress?.pincode,
        phone: selectedAddress?.phone,
        notes: selectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      console.log(result, "create Order");
      setIsPaymentStart(true);
    } catch (error) {
      toast(error?.data?.message);
    }
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={banner3}
          className="object-cover object-center w-full h-full "
        />
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 mt-5 sm:grid-cols-2">
        <Address setSelectedAddress={setSelectedAddress} />
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
            <Button onClick={handleOrderCreation} className="w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
