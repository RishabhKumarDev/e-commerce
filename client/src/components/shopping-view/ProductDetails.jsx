import StarRating from "@/components/common/StarRating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { addReview, getReviews } from "@/features/shopping/reviewSlice";
import { setProductDetails } from "@/features/shopping/shoppingSlice";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);

  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shoppingReview);

  const dispatch = useDispatch();

  const handleRatingChange = (getRating) => {
    if (rating === getRating) {
      setRating(0);
      return;
    }
    setRating(getRating);
  };
  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMessage("");
  };

  const handleAddReview = async () => {
    if (rating === 0) {
      toast.warning("Seems you forgot to rate");
    }

    const data = {
      productId: productDetails._id,
      userId: user._id,
      userName: user.userName,
      reviewMessage,
      reviewValue: rating,
    };

    try {
      await dispatch(addReview(data)).unwrap();
      await dispatch(getReviews(productDetails._id)).unwrap();
      toast.success("Review is Added");
      setRating(0);
      setReviewMessage("");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    const handleReviewsFetch = async () => {
      await dispatch(getReviews(productDetails?._id)).unwrap();
    };
    if (productDetails !== null) {
      handleReviewsFetch();
    }
  }, [productDetails]);
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
            <StarRating rating={productDetails?.averageReview} />
            <span className="text-muted-foreground">
              {(productDetails?.averageReview || 0 ).toFixed(2)}
            </span>
          </div>
          <div>
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full mt-5 mb-5 opacity-55 cursor-not-allowed">
                Out of stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full mt-5 mb-5"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-y-auto">
            <h2 className="mb-4 text-xl font-bold">Reviews</h2>
            <div className="grid gap-6 mt-3">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <>
                    <div className="flex  gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback className="font-bold ">
                          {review?.userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{review?.userName}</h3>
                        </div>
                        <StarRating rating={review?.reviewValue} />
                        <p className="text-muted-foreground">
                          {review?.reviewMessage}
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
          </div>
          <div className="mt-10 flex gap-2 flex-col">
            <Label className="text-xl">Leave a review </Label>
            <div className="flex">
              <StarRating
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <Input
              name="reviewMessage"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Tell about the exprience with Product..."
            />
            <Button
              disable={reviewMessage.trim() === ""}
              onClick={handleAddReview}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
