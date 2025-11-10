import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10,
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
        minLength: [6, "password has to be atleast 6 character long"],
        maxLength: [12, "Password is too long"]
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

 export const User = new mongoose.model("User", userSchema);