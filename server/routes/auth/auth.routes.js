import { Router } from 'express';
import { loginUser, logoutUser, registerUser, authMiddleware } from '../../controllers/auth/user.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const router = Router({ mergeParams: true });


router.route("/register").post(asyncHandler(registerUser))
router.route("/login").post(asyncHandler(loginUser));
router.route("/logout").post(authMiddleware, asyncHandler(logoutUser));
router.route("/check-auth").get(authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200)
        .json(new ApiResponse(200, user, "User Authanticated!"))
})


export default router;