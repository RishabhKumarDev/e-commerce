import CommonForm from "@/components/common/Form";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const initialFormData = {
  status: "",
};
function AdminOrderDetailsView() {
  const [formData, setFormData] = useState(initialFormData);

  const handleOrderStatusUpdate = (event) => {
    event.preventDefault();
  };
  return (
    <DialogContent className="sm:m-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id</p>
            <Label>12345689</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>20/234/23</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>In Process</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>$500</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Blue red</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
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
