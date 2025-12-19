import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { getProductReviews, addProductReview } from '../../controllers/shopping/product-review.controller.js';

const router = Router({ mergeParams:true });


router.route("/get/:productId").get(asyncHandler(getProductReviews));
router.route("/add").post(asyncHandler(addProductReview));

export default router;