import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

 export const User = new mongoose.model("User", userSchema);