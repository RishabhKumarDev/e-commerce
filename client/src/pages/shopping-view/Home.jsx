import { Button } from "@/components/ui/button";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
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
import { fetchAllFilteredProducts } from "@/features/shopping/shoppingSlice";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";

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
const slides = [banner1, banner2, banner3];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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

  console.log(productList, " produnt list in home ");
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, idx) => (
          <img
            src={slide}
            key={idx}
            className={`${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute transform -translate-y-1/2 top-1/2 left-4 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <CircleChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute transform -translate-y-1/2 top-1/2 right-4 bg-white/80"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
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
          <h2 className="mb-8 text-3xl font-bold text-center">
            Shop By Brand
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {brandsWithIcons.map((brand) => (
              <Card
                key={brand.id}
                className="transition-shadow cursor-pointer hover:shadow-lg"
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
                <ShoppingProductTile product={product} />
              ))
            : null}
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
