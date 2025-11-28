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
import { ArrowUpDownIcon } from "lucide-react";

function ShoppingListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4">
      <ProductFilter />
      <div className="w-full rounded-lg shadow-sm bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-extrabold"> All Products </h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground">
              10 Products
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
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
          <ShoppingProductTile />
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
