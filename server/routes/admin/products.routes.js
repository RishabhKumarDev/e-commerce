
import express from 'express';
import { upload } from '../../helpers/multer.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { handleProductImageUpload } from '../../controllers/admin/products.controller.js';

const router = express.Router({ mergeParams: true });

router.route("/image-upload").post(upload.single("my_file"), asyncHandler(handleProductImageUpload));



export default router