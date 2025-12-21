import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChartNoAxesColumnIncreasing,
  Check,
  CircleChevronLeft,
  CircleChevronRight,
  Drama,
  Footprints,
  ShirtIcon,
  ShoppingBag,
  ShoppingBasket,
  Tag,
  WatchIcon,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/features/shopping/shoppingSlice";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import { useNavigate } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "@/features/shopping/cartSlice";
import { getBannerImages } from "@/features/common/bannerSlice";

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: Drama },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcons = [
  { id: "nike", label: "Nike", icon: Check },
  { id: "adidas", label: "Adidas", icon: ChartNoAxesColumnIncreasing },
  { id: "puma", label: "Puma", icon: Zap },
  { id: "levi", label: "Levi", icon: Tag },
  { id: "zara", label: "Zara", icon: ShoppingBag },
  { id: "h&m", label: "H&M", icon: ShoppingBasket },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { bannerImages } = useSelector((state) => state.commonBanner);

  const slideCount = bannerImages?.length || 0;

  const [openProductDialog, setOpentProductDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigationToListingPage = (item, section) => {
    sessionStorage.removeItem("filters");
    let filter = { [section]: [item] };
    sessionStorage.setItem("filters", JSON.stringify(filter));
    navigate("/shopping/listing");
  };

  const getProductDetails = async (getProductId) => {
    try {
      let result = await dispatch(fetchProductDetails(getProductId)).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Coludn't Fetch Product Details");
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

  const fetchBannerImages = async () => {
    try {
      await dispatch(getBannerImages()).unwrap();
    } catch (error) {
      toast.error(error?.data.message);
    }
  };

  useEffect(() => {
    if (slideCount === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideCount);
    }, 4000);

    return () => clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(
          fetchAllFilteredProducts({
            filterParams: {},
            sortParams: "price-lowtohigh",
          })
        ).unwrap();
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpentProductDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    fetchBannerImages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {bannerImages && bannerImages.length > 0
          ? bannerImages.map((bImg, idx) => (
              <img
                src={bImg.image}
                key={idx}
                className={`${
                  idx === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          className="absolute transform -translate-y-1/2 top-1/2 left-4 bg-white/80"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides) % slideCount)
          }
        >
          <CircleChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute transform -translate-y-1/2 top-1/2 right-4 bg-white/80"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slideCount)
          }
        >
          <CircleChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="p-12 bg-white/50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categoriesWithIcons.map((category) => (
              <Card
                key={category.id}
                className="transition-shadow cursor-pointer hover:shadow-lg"
                onClick={() =>
                  handleNavigationToListingPage(category.id, "category")
                }
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="p-12 bg-white/50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Shop By Brand</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {brandsWithIcons.map((brand) => (
              <Card
                key={brand.id}
                className="transition-shadow cursor-pointer hover:shadow-lg"
                onClick={() => handleNavigationToListingPage(brand.id, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brand.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {productList && productList.length > 0
            ? productList.map((product) => (
                <ShoppingProductTile
                  handleAddToCart={handleAddToCart}
                  getProductDetails={getProductDetails}
                  product={product}
                />
              ))
            : null}
        </div>
      </section>
      <ProductDetailsDialog
        open={openProductDialog}
        setOpen={setOpentProductDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default ShoppingHome;
