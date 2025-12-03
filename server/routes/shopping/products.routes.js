import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { getFilteredProducts, getProductDetails } from '../../controllers/shopping/products.controller.js';


const router = Router({ mergeParams: true })

router.route("/get").get(asyncHandler(getFilteredProducts));
router.route("/get/:productID").get(asyncHandler(getProductDetails));

export default router;