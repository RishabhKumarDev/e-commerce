import { Product } from '../../models/product.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';


const getFilteredProducts = async (req, res) => {
    const products = Product.find({});

    res.status(200).json(new ApiResponse(200, products, "Successfully fetched Products"))
}

export {
    getFilteredProducts
}