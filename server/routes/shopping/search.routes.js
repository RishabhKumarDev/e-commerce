import { Router } from 'express';
import { searchProducts } from '../../controllers/shopping/search.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router({ mergeParams: true });

router.route("/:keyword").get(asyncHandler(searchProducts));

export default router;