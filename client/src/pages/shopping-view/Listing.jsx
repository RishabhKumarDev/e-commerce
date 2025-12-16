import { Loader } from "@/components/common/Loader";
import ProductFilter from "@/components/shopping-view/Filter";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config/formConfig";
import { addToCart, fetchCartItems } from "@/features/shopping/cartSlice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/features/shopping/shoppingSlice";
import { ArrowUpDownIcon, Rat } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const createSearchParamsHelper = (filtersParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filtersParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};
function ShoppingListing() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openProductDialog, setOpentProductDialog] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);

  const categorySearchParams = searchParams.get("category")
  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    const newFilter = { ...filters };

    let options = newFilter[getSectionId] || [];

    if (options.includes(getCurrentOption)) {
      newFilter[getSectionId] = options.filter((o) => o !== getCurrentOption);
    } else {
      newFilter[getSectionId] = [...options, getCurrentOption];
    }

    setFilters(newFilter);
    sessionStorage.setItem("filters", JSON.stringify(newFilter));
  };

  const getProductDetails = async (getProductId) => {
    try {
      let result = await dispatch(fetchProductDetails(getProductId)).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Couldn't Fetch Product Details");
    }
  };

  const handleAddToCart = async (getProductId) => {
    console.log(getProductId);
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

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createSearchParms = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createSearchParms));
    }
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpentProductDialog(true);
    }
  }, [productDetails]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="w-full rounded-lg shadow-sm bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-extrabold"> All Products </h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDownIcon className="w-6 h-6" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { productList && productList.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductTile
                getProductDetails={getProductDetails}
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <h1 className="text-2xl font-semibold bg-linear-180 underline-offset-2">
              <Rat className="h-14 w-14" /> Sorry Admin is Lazy... has not
              uploaded any Product yet...
            </h1>
          )}
        </div>
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

export default ShoppingListing;
