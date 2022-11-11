import wrap from "../utils/wrap.js";
import Order from "../models/orderModel.js";

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private
 */
export const createOrder = wrap(async (req, res, next) => {
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

/**
 * @desc Get order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
export const getOrder = wrap(async (req, res, next) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    return res.status(200).json(order);
});

/**
 * @desc Update order to paid
 * @route PUT /api/orders/:id/pay
 * @access Private
 */
export const updateOrderPaidField = wrap(async (req, res, next) => {
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

/**
 * @desc Get logged in user orders
 * @route GET /api/orders/me
 * @access Private
 */
export const getLoggedInUserOrders = wrap(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json(orders);
});

/**
 * @desc Get all orders
 * @route GET /api/orders
 * @access Private/Admin
 */
export const getOrders = wrap(async (req, res, next) => {
    const orders = await Order.find().populate("user", "id name email");
    return res.status(200).json(orders);
});
