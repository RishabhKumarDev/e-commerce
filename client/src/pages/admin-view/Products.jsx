import ProductImageUpload from "@/components/admin-view/ImageUpload";
import AdminProductTile from "@/components/admin-view/ProductTile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormConfig } from "@/config/formConfig";
import { addNewProduct, fetchAllProducts } from "@/features/admin/adminSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { products } = useSelector((state) => state.adminProducts);
  console.log(products);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const addedProduct = await dispatch(
        addNewProduct({ ...formData, image: uploadedImageUrl })
      ).unwrap();

      if (addedProduct?.success) {
        dispatch(fetchAllProducts());
        setImageFile(null);
        setUploadedImageUrl("");
        setFormData(initialState);
        setOpenCreateProductDialog(false);
        toast.success(addedProduct.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Couldn't Add Product!!!");
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  // console.log(formData, "formData");
  return (
    <>
      <div className="flex justify-end w-full mb-5">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {products && products.length > 0
          ? products.map((product) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={product}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
        }}
      >
        <SheetContent side="right" className="overflow-auto p-6">
          <SheetHeader>
            <SheetTitle className="text-2xl">Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormConfig}
              buttonText="Add Product"
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              disableBtn={imageLoadingState}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
