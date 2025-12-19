import { Review } from '../../models/review.model.js';
import { Product } from '../../models/product.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { Order } from '../../models/order.model.js';


const addProductReview = async (req, res) => {

    const {
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
    } = req.body;

    if (!productId || !userId || !userName || !reviewMessage || !reviewValue) {
        throw new ApiError(400, "All fields are required");
    }


    const isProductBought = await Order.exists({ userId, cartItems: { $elemMatch: { productId } }, orderStatus: "confirmed" });

    if (!isProductBought) {
        throw new ApiError(403, "You need to purchase the product to review");
    }

    const isAlreadyReviewed = await Review.exists({ userId, productId });

    if (isAlreadyReviewed) {
        throw new ApiError(400, "Can't do more than one review")
    }
    const newReview = await Review.create({
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
    });

    if (!newReview) {
        throw new ApiError(404, "couldn't create Review");
    }

    const reviews = await Review.find({ productId }).select("reviewValue");
    const reviewsLength = reviews.length;
    const averageReview = (reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviewsLength).toFixed(2);

    await Product.findByIdAndUpdate(productId, { averageReview, reviewCount: reviewsLength });

    res.status(201)
        .json(new ApiResponse(201, { newReview }, "successfully created a new Review"));
};


const getProductReviews = async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "productId is required")
    };

    const product = await Product.exists({ _id: productId });

    if (!product) {
        throw new ApiError(404, "product doesn't exist");
    };

    const productReviews = await Review.find({ productId });

    res.status(200)
        .json(new ApiResponse(200, { productReviews }, "successfully fetched reviews"))
};


export {
    addProductReview,
    getProductReviews
}