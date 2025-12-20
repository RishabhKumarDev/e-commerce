import paypal from '../../helpers/paypal.js';
import { Order } from '../../models/order.model.js';
import { Cart } from '../../models/cart.model.js';
import { Product } from '../../models/product.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const createOrder = async (req, res, next) => {
    const {
        userId,
        cartItems,
        address,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
        cartId,
    } = req.body;

    const items = cartItems.map(item => ({
        name: item.title,
        sku: item.productId,
        price: Number(item.price).toFixed(2),
        currency: "USD",
        quantity: item.quantity,
    }));

    const itemsTotal = items.reduce((sum, item) => {
        return sum + Number(item.price) * item.quantity;
    }, 0);

    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: `${process.env.CLIENT_BASE_URL}/shopping/paypal-return`,
            cancel_url: `${process.env.CLIENT_BASE_URL}/shopping/paypal-cancel`
        },
        transactions: [
            {
                item_list: {
                    items
                },
                amount: {
                    currency: "USD",
                    total: itemsTotal.toFixed(2)
                },
                description: "description"
            }
        ]
    }

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
            return next(new ApiError(500, "Error while creating payment"));
        } else {
            const newOrder = new Order({
                userId,
                cartItems,
                address,
                orderStatus,
                paymentMethod,
                paymentStatus,
                totalAmount,
                orderDate,
                orderUpdateDate,
                paymentId,
                payerId,
                cartId,
            });

            await newOrder.save();
            const approvalURL = paymentInfo.links.find(link => link.rel === "approval_url").href;
            res.status(201).json(new ApiResponse(201, { approvalURL, orderId: newOrder._id }, "order created successfully"))

        }
    })
};

const capturePayment = async (req, res) => {
    const { orderId, paymentId, payerId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order doesn't exist");
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
        const result = await Product.updateOne(
            { _id: item.productId, totalStock: { $gte: item.quantity } },
            { $inc: { totalStock: -item.quantity } }
        );

        if (result.modifiedCount === 0) {
            console.log(result)
            throw new ApiError(404, `${item.title} is Out of stock`);
        }
    }
    let cartId = order.cartId;
    await Cart.findByIdAndDelete(cartId);

    await order.save();
    res.status(200)
        .json(new ApiResponse(200, order, "Order Confirmed "))
};

const getAllOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        throw new ApiError(400, "userId is required");
    }

    const orders = await Order.find({ userId })

    if (orders.length === 0) {
        throw new ApiError(404, "Couldn't found orders");
    }

    res.status(200)
        .json(new ApiResponse(200, orders, "successfully fetched Orders"))
}

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError(400, "OrderId is required");
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(400, "Order Doesn't exist");
    }

    res.status(200)
        .json(new ApiResponse(200, order, "successfully fetched order details"))
}
export {
    createOrder,
    capturePayment,
    getAllOrdersByUser,
    getOrderDetails
}