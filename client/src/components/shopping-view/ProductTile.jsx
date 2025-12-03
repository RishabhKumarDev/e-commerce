import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// utils/format.js
const formatLabel = (str) => str.replace(/\b\w/g, (l) => l.toUpperCase());

function ShoppingProductTile({ product, getProductDetails }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => getProductDetails(product._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="object-cover w-full rounded-t-lg h-72"
          />
          {product.salePrice > 0 ? (
            <Badge className="absolute bg-red-500 left-2 top-2 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="mb-2 text-xl font-bold">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {formatLabel(product?.category)}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatLabel(product?.brand)}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through " : ""
              }text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
