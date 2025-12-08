import { Button } from "@/components/ui/button";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQty,
} from "@/features/shopping/cartSlice";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function CartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCartItemDelete = async (getProdutId) => {
    try {
      await dispatch(
        deleteCartItem({ userId: user?._id, productId: getProdutId })
      ).unwrap();

      dispatch(fetchCartItems(user?._id));
    } catch (error) {}
  };

  const handleCartItemQuantity = async (
    getProdutId,
    typeOfAction,
    currentQnt
  ) => {
    try {
      let quantity = typeOfAction === "add" ? currentQnt + 1 : currentQnt - 1;
      await dispatch(
        updateCartItemQty({
          userId: user?._id,
          productId: getProdutId,
          quantity,
        })
      ).unwrap();
    } catch (error) {
      console.log(error, "quantity");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="object-cover w-20 h-20 rounded"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            className="w-6 h-6 rounded-full"
            variant="outline"
            size="icon"
            disabled={cartItem.quantity === 1}
            onClick={() =>
              handleCartItemQuantity(cartItem._id, "minus", cartItem.quantity)
            }
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Minus</span>
          </Button>
          <span className="text-lg font-semibold">{cartItem.quantity}</span>
          <Button
            className="w-6 h-6 rounded-full"
            variant="outline"
            size="icon"
            onClick={() =>
              handleCartItemQuantity(cartItem._id, "add", cartItem.quantity)
            }
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Minus</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(cartItem.salePrice > 0
            ? cartItem.salePrice
            : cartItem.price * cartItem.quantity
          ).toFixed(2)}
        </p>
        <Trash2
          onClick={() => handleCartItemDelete(cartItem?._id)}
          className="mt-1 cursor-pointer"
          size={20}
        />
      </div>
    </div>
  );
}

export default CartItemsContent;
