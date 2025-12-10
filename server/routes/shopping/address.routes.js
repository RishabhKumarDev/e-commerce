import { asyncHandler } from '../../utils/asyncHandler.js';
import {
    addAddress,
    fetchAllAddresses,
    updateAddress,
    deleteAddress
} from '../../controllers/shopping/address.controller.js';

import { Router } from 'express';

const router = Router({ mergeParams: true });

router.route("/add").post(asyncHandler(addAddress));
router.route("/get/:userId").get(asyncHandler(fetchAllAddresses));
router.route("/update/:userId/:addressId").put(asyncHandler(updateAddress));
router.route("/delete/:userId/:addressId").delete(asyncHandler(deleteAddress));


export default router;