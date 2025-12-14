import paypal from '../../helpers/paypal.js';
import { Order } from '../../models/order.model.js';
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
            return_url: "http://localhost:5173/shopping/paypal-return",
            cancel_url: "http://localhost:5173/shopping/paypal-cancel"
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
const capturePayment = async (req, res) => { };

export {
    createOrder,
    capturePayment
}