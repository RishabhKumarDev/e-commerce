import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

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


export { registerUser }