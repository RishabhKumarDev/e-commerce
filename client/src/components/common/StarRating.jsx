import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

function StarRating({ rating , handleRatingChange }) {
  return (
    <div className="flex items-center justify-center ">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star}>
          <Star
            onClick={handleRatingChange ? () => handleRatingChange(star) : null}
            className={`${
              handleRatingChange
                ? "hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer "
                : ""
            } h-6 w-6  ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default StarRating;
