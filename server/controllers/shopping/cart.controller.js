import { Cart } from "../../models/cart.model.js";
import { Product } from '../../models/product.model.js';
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
        throw new ApiError(400, "Missing required fields")
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product doesn't exist")
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] })
    }

    const existingProduct = cart?.items.find(item => item.productId.toString() === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.items.push({ productId, quantity })
    }

    await cart.save();
    res
        .status(200)
        .json(new ApiResponse(200, cart, "Successfully added Product in Cart"))

};


const deleteCartItem = async (req, res) => {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
        throw new ApiError(400, "Missing required fields")
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, "Cart doesn't exists");
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res
        .status(200)
        .json(new ApiResponse(200, {}, "Successfully removed Item"));

};


const fetchCartItems = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "Id is missing")
    }

    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "title price image salePrice"
    })

    if (!cart) {
        res
            .status(200)
            .json(new ApiResponse(200, cart, "successfully fetched cart items"));
    }

    const validItems = cart.items.filter(productItem => productItem.productId);

    if (validItems.length < cart.items.length) {
        cart.items = validItems;
        await cart.save();
    }

    const structuredItems = cart.items.map(item => (
        {
            _id: item.productId._id,
            title: item.productId.title,
            image: item.productId.image,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }
    ))

    res
        .status(200)
        .json(new ApiResponse(200, { ...cart._doc, structuredItems }, "successfully fetched cart itmes"));

};


const updateCartItemQty = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
        throw new ApiError(400, "Missing required fields")
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, "Cart doesn't exist")
    }

    const currentCartItem = cart.items.find(cartItem => cartItem.productId.toString() === productId);

    if (!currentCartItem) {
        throw new ApiError(404, "Product doensn't exist");
    }
    currentCartItem.quantity = quantity;
    await cart.save();

    await cart.populate({
        path: "items.productId",
        select: "title price image salePrice"
    })

    const structuredItems = cart.items.map(item => (
        {
            _id: item.productId._id || null,
            title: item.productId.title || null,
            image: item.productId.image || null,
            price: item.productId.price || null,
            salePrice: item.productId.salePrice || null,
            quantity: item.quantity,
        }
    ))

    res
        .status(200)
        .json(new ApiResponse(200, { ...cart.toObject(), structuredItems }, "Successfully updated the itme Quantity"))

};


export {
    addToCart,
    deleteCartItem,
    fetchCartItems,
    updateCartItemQty
}