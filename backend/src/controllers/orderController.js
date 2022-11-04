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

    res.status(201).json(createdOrder);
});
