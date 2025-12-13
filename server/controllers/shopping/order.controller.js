import paypal from '../../helpers/paypal.js';
import { Order } from '../../models/order.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const createOrder = async (req, res) => {
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
    } = req.body;

    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:5173/shopping/paypal-return",
            calcle_url: "http://localhost:5173/shopping/paypal-cancel"
        },
        transactions: [
            {
                item_list: {
                    items: cartItems.map(cartItem => ({
                        name: cartItem.title,
                        sku: cartItem.productId,
                        price: cartItem.price.toFixed(2),
                        currency: "USD",
                        quantity: cartItem.quantity,
                    }))
                },
                amount: {
                    currency: "USD",
                    total: totalAmount.toFixed(2)
                },
                description: "description"
            }
        ]
    }

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
            throw new ApiError(500, "Error while creating payment")
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