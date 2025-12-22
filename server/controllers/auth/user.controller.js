import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';


const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashPassword });

    await newUser.save()
    const userWithoutPassword = {
        _id: newUser._id, userName, email
    }
    res.status(200).json(new ApiResponse(200, userWithoutPassword))
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User doesn't exist")
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new ApiError(401, "Entered wrong password");
    }

    const token = jwt.sign({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });

    res.status(200)
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000
        })
        .json(new ApiResponse(200, {
            userName: user.userName,
            email: user.email,
            role: user.role,
            _id: user._id,
            token
        },
            "Logged In Successfully"
        ))
}


const logoutUser = async (req, res) => {
    res
        .clearCookie("token")
        .status(200)
        .json(new ApiResponse(200, {}, "Logout successful"))
}

/*
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new ApiError(401, "Unauthorized User")
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized User")
    }
}
 */

const authMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        throw new ApiError(401, "Unauthorized User")
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized User")
    }
}
export { registerUser, loginUser, logoutUser, authMiddleware }