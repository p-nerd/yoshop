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

export const getOrderById = wrap(async (req, res, next) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    return res.status(200).json(order);
});

export const updateOrderToPaid = wrap(async (req, res, next) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
    };

    const updateOrder = await order.save();
    return res.status(200).json(updateOrder);
});

export const getLoggedInUserOrders = wrap(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json(orders);
});
