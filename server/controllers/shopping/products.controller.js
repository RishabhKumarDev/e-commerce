import { Product } from '../../models/product.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';



const getFilteredProducts = async (req, res) => {

    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category?.length) {
        filters.category = { $in: category.split(",") }
    }

    if (brand?.length) {
        filters.brand = { $in: brand.split(",") }
    }

    let sort = {};

    switch (sortBy) {
        case "price-lowtohigh":
            sort.price = 1;
            break;
        case "price-hightolow":
            sort.price = -1;
            break;
        case "title-atoz":
            sort.title = 1;
            break;
        case "title-ztoa":
            sort.title = -1;
            break;
        default: sort.price = 1;
            break;
    }
    const products = await Product.find(filters).sort(sort);

    res.status(200).json(new ApiResponse(200, products, "Successfully fetched Products"))
}


const getProductDetails = async (req, res) => {
    const { productID } = req.params;


    if (!productID) {
        throw new ApiError(400, "productID is Missing");
    }
    const product = await Product.findById(productID);

    if (!product) {
        throw new ApiError(404, "Product doesn't exist")
    }

    res.status(200)
        .json(new ApiResponse(200, product, "successfully fetched product details"))
}
export {
    getFilteredProducts,
    getProductDetails
}