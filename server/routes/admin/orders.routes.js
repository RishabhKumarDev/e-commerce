import { Router } from 'express';
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from '../../controllers/admin/orders.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router({ mergeParams: true });

router.route("/get").get(asyncHandler(getAllOrdersOfAllUsers));
router.route("/update-status/:orderId").patch(asyncHandler(updateOrderStatus));
router.route("/details/:orderId").get(asyncHandler(getOrderDetailsForAdmin));


export default router;