import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function imageUploadUtil(file) {
    if (!file) return null;
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
}

export { imageUploadUtil };