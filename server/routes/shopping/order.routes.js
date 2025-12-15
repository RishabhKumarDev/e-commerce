import { Router } from 'express';
import { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails } from '../../controllers/shopping/order.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router({ mergeParams: true });

router.route("/create").post(asyncHandler(createOrder));
router.route("/capture").post(asyncHandler(capturePayment));
router.route("/list/:userId").get(asyncHandler(getAllOrdersByUser));
router.route("/details/:orderId").get(asyncHandler(getOrderDetails));


export default router;