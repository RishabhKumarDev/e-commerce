import { Loader } from "@/components/common/Loader";
import ProductFilter from "@/components/shopping-view/Filter";
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
import { fetchAllFilteredProducts } from "@/features/shopping/shoppingSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { isLoading, productList } = useSelector(
    (state) => state.shoppingProducts
  );

  console.log(isLoading, productList, " product--list==[]");
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4">
      <ProductFilter />
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
                <DropdownMenuRadioGroup>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <Loader />
          ) : productList && productList.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductTile product={product} /> 
            ))
          ) : (
            <h1 className="text-2xl font-semibold bg-linear-180 underline-offset-2">
              Wait Admin is Lazy... has not uploaded any Product yet...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
