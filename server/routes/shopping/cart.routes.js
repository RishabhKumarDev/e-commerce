import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { addToCart, updateCartItemQty, fetchCartItems, deleteCartItem } from '../../controllers/shopping/cart.controller.js';


const router = Router({ mergeParams: true })

router.route("/get/:userId").get(asyncHandler(fetchCartItems));
router.route("/add").post(asyncHandler(addToCart));
router.route("/update-cart").put(asyncHandler(updateCartItemQty));
router.route("/:userId/:productId").delete(asyncHandler(deleteCartItem));

export default router;