import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { Product } from '../../models/product.model.js';


const searchProducts = async (req, res) => {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== 'string') {
        throw new ApiError(400, "keyword is required and as string")
    }


    const regEx = new RegExp(keyword, "i");
    const searchQuery = {
        $or: [
            { title: regEx },
            { description: regEx },
            { category: regEx },
            { brand: regEx },

        ]
    }

    const resultProducts = await Product.find(searchQuery);
    console.log(resultProducts, "serach")
    res
        .status(200)
        .json(new ApiResponse(200,  resultProducts , "Fetched products successfully"))
}

export {
    searchProducts
}