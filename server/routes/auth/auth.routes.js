import { Router } from 'express';
import { registerUser } from '../../controllers/auth/user.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router({ mergeParams: true });


router.route("/register").post(asyncHandler(registerUser))




export default router;