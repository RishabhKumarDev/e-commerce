
import express from 'express';
import { upload } from '../../helpers/multer.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { handleProductImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct } from '../../controllers/admin/products.controller.js';

const router = express.Router({ mergeParams: true });

router.route("/image-upload").post(upload.single("my_file"), asyncHandler(handleProductImageUpload));
router.route("/add").post(asyncHandler(addProduct));
router.route("/get").get(asyncHandler(fetchAllProducts));
router.route("/edit/:id").patch(asyncHandler(editProduct));
router.route("/delete/:id").delete(asyncHandler(deleteProduct));


export default router