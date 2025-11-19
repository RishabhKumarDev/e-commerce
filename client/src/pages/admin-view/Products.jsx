import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormConfig } from "@/config/formConfig";
import { useState } from "react";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (formData) => {};
  return (
    <>
      <div className="flex justify-end w-full mb-5">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => setOpenCreateProductDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl">Add New Product</SheetTitle>
            <div className="py-6">
              <CommonForm
                formControls={addProductFormConfig}
                buttonText="Add Product"
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
              />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
