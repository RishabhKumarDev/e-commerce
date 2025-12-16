import { Badge } from "@/components/ui/badge";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent className="sm:m-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 mb-0.5 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-700"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-800"
                    : ""
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems.map((item) => (
                <li className="flex items-center justify-between">
                  <span>Title:{item?.title}</span>
                  <span>Qnt: ${item?.quantity}</span>
                  <span>Price: ${item?.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.address.address}</span>
              <span>{orderDetails?.address.city}</span>
              <span>{orderDetails?.address.pincode}</span>
              <span>{orderDetails?.address.phone}</span>
              <span>{orderDetails?.address.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
