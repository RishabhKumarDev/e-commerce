import { Order } from '../../models/order.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const getAllOrdersOfAllUsers = async (req, res) => {

    const orders = await Order.find({});

    if (orders.length === 0) {
        throw new ApiError(404, "Couldn't found orders");
    }

    res.status(200)
        .json(new ApiResponse(200, orders, "successfully fetched Orders"));
};

const getOrderDetailsForAdmin = async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError(400, "OrderId is required");
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(400, "Order Doesn't exist");
    }

    res.status(200)
        .json(new ApiResponse(200, order, "successfully fetched order details"));
};

const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
        throw new ApiError(400, "OrderId is required");
    };

    if (!status) {
        throw new ApiError(400, "Status is required")
    };

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order Doesn't Exist")
    }

    if (order.orderStatus === "delivered") {
        throw new ApiError(400, "Can't update a confirmed order")
    }

    order.orderStatus = status;

    const savedOrder = await order.save();
    res.status(200)
        .json(new ApiResponse(200, savedOrder, "Successfully Updated Order Status"));
}
export {
    getAllOrdersOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus
}