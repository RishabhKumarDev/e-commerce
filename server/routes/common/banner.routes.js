import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { addBanner, fetchBanner, deleteBanner } from '../../controllers/common/banner.controller.js';

const router = Router({ mergeParams: true });

router.route("/upload").post(asyncHandler(addBanner))
router.route("/get").get(asyncHandler(fetchBanner));


export default router;