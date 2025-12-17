import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/features/shopping/cartSlice";
import { getSearchResult } from "@/features/shopping/searchSlice";
import { fetchProductDetails } from "@/features/shopping/shoppingSlice";
import { Rat, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openProductDialog, setOpentProductDialog] = useState(false);

  const { searchResults } = useSelector((state) => state.shoppingSearch);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shoppingProducts);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleKeywordSearch = async () => {
    try {
      const response = await dispatch(getSearchResult(keyword)).unwrap();
      console.log(response, searchResults, "search result");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (getProductId, totalStock) => {
    const cartItem = cartItems?.find((item) => item._id === getProductId);
    if (cartItem) {
      let quantity = cartItem.quantity >= totalStock;
      if (quantity) {
        toast.warning(
          "You’ve reached the maximum available stock for this item."
        );
        return;
      }
    }
    try {
      const response = await dispatch(
        addToCart({ userId: user?._id, productId: getProductId, quantity: 1 })
      ).unwrap();

      dispatch(fetchCartItems(user?._id));
      toast("Product Added to Cart");
    } catch (error) {
      console.log(error, " handleAddToCart");
    }
  };

  const getProductDetails = async (getProductId) => {
    try {
      let result = await dispatch(fetchProductDetails(getProductId)).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Coludn't Fetch Product Details");
    }
  };

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setSearchParams({ query: keyword });
      handleKeywordSearch();
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpentProductDialog(true);
    }
  }, [productDetails]);
  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full">
          <Input
            placeholder="Search Products.."
            className="py-6 "
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            name="keyword"
          />
          <Button className="py-6">
            <Search />
            Search
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((product) => (
            <ShoppingProductTile
              getProductDetails={getProductDetails}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : keyword === "" ? (
          <h1>
            <Rat /> Your Search will Appear here...
          </h1>
        ) : (
          <h1> Product doesn't exist... </h1>
        )}
      </div>
      <ProductDetailsDialog
        open={openProductDialog}
        setOpen={setOpentProductDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default SearchProducts;
