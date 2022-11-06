import wrap from "../middlewares/wrap.js";
import Order from "../models/orderModel.js";

export const createNewOrder = wrap(async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        texPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }
    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        texPrice,
        shippingPrice,
        totalPrice,
    });

    const createdOrder = await order.save();

    return res.status(201).json(createdOrder);
});

export const getOrders = wrap(async (req, res, next) => {
    const order = await Order.find().populate("user", "name email");

    if (!order) {
        res.status(404);
        throw new Error("Orders not found");
    }

    return res.status(200).json(order);
});

export const getOrderById = wrap(async (req, res, next) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    return res.status(200).json(order);
});
