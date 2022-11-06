import { Router } from "express";
import {
    createNewOrder,
    getOrderById,
    getOrders,
} from "../controllers/orderController.js";
import protect from "../middlewares/protect.js";
import { validId } from "../middlewares/validate.js";

const orderRouter = Router();

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private
 */
orderRouter.post("/", [protect], createNewOrder);

/**
 * @desc Get all orders
 * @route GET /api/orders
 * @access Private
 */
orderRouter.get("/", [protect], getOrders);

/**
 * @desc Get order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
orderRouter.get("/:id", [protect, validId], getOrderById);

export default orderRouter;
