import { Router } from 'express';
import { loginUser, registerUser } from '../../controllers/auth/user.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router({ mergeParams: true });


router.route("/register").post(asyncHandler(registerUser))
router.route("/login").post(asyncHandler(loginUser));



export default router;