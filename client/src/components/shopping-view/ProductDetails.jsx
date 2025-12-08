import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { setProductDetails } from "@/features/shopping/shoppingSlice";
import { StarIcon } from "lucide-react";
import { useDispatch } from "react-redux";

function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) {
  const dispatch = useDispatch();
  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="object-cover w-full aspect-square"
          />
        </div>
        <div className="gap-6 ">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="mt-4 mb-5 text-2xl text-muted-foreground">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`${
                productDetails?.salePrice > 0 ? "line-through " : " "
              } text-3xl font-bold text-primary`}
            >
              ${productDetails?.price}
            </span>
            {productDetails?.salePrice > 0 ? (
              <span className="text-3xl font-bold text-primary">
                ${productDetails?.salePrice}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className=" flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.3)</span>
          </div>
          <div>
            <Button
              onClick={() => handleAddToCart(productDetails?._id)}
              className="w-full mt-5 mb-5"
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="mb-4 text-xl font-bold">Reviews</h2>
            <div className="grid gap-6 mt-3">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback className="font-bold ">BL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">blue red </h3>
                  </div>
                  <div className=" flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Input placeholder="Tell about the exprience with Product..." />
            <Button> Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
