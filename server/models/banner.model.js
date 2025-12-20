import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    image: String,
}, { timestamps: true });


export const Banner = mongoose.model("Banner", bannerSchema);