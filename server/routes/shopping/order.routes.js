import { Router } from 'express';
import { createOrder, capturePayment } from '../../controllers/shopping/order.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router({ mergeParams: true });

router.route("/create").post(asyncHandler(createOrder));


export default router;