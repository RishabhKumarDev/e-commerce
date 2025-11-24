import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../models/product.model.js";
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';

const handleProductImageUpload = async (req, res) => {

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.status(200)
        .json(new ApiResponse(200, { result }, "Image Uploaded Successfully"))
}

// add a new product
const addProduct = async (req, res) => {
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    const addedProduct = new Product({ image, title, description, category, brand, price, salePrice, totalStock })

    await addedProduct.save();
    res.status(201).json(new ApiResponse(201, addedProduct, "successfully added the product"))
}


// featch all product
const fetchAllProducts = async (req, res) => {
    const productList = await Product.find({});

    res.status(200).json(new ApiResponse(200, productList, "list of products featched successfully"))
}


// edit a product 
const editProduct = async (req, res) => {
    const { id } = req.params;
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { image, title, description, category, brand, price, salePrice, totalStock }, { new: true });

    if (updatedProduct === null) {
        throw new ApiError(404, "Product doesn't exist")
    }
    res.status(200).json(new ApiResponse(200, updatedProduct, "Successfully Updated Product"))

}

// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct === null) {
        throw new ApiError(404, "Product doesn't exist");
    }

    res.status(200).json(new ApiResponse(200, deletedProduct, "Successfully Deleted Product"));
}

export {
    handleProductImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
}