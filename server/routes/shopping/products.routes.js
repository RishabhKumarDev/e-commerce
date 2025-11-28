import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { getFilteredProducts } from '../../controllers/shopping/products.controller.js';


const router = Router({ mergeParams: true })

router.route("/get").get(asyncHandler(getFilteredProducts))

export default router;