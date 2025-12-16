import CommonForm from "@/components/common/Form";
import { Badge } from "@/components/ui/badge";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  getAllOrdersAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/features/admin/orderSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};
function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleOrderStatusUpdate = async (event) => {
    event.preventDefault();
    if (formData.status === "") {
      toast.warning("status is empty");
      return;
    }

    try {
      await dispatch(
        updateOrderStatus({
          orderId: orderDetails?._id,
          status: formData.status,
        })
      ).unwrap();

      await dispatch(getOrderDetailsForAdmin(orderDetails?._id)).unwrap();
      await dispatch(getAllOrdersAdmin()).unwrap();
      toast.success("Order Status Updated Successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  
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
        <div>
          <CommonForm
            formControls={[
              {
                name: "status",
                label: "Order Status",
                componentType: "select",
                options: [
                  { id: "pending", label: "In Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShiping", label: "In Shiping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleOrderStatusUpdate}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
