import { Router } from "express";
import {
    createNewOrder,
    getLoggedInUserOrders,
    getOrderById,
    updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import { validId } from "../middlewares/validateMiddlewares.js";

const orderRouter = Router();

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private
 */
orderRouter.post("/", [protect], createNewOrder);

/**
 * @desc Get logged in user orders
 * @route GET /api/orders/me
 * @access Private
 */
orderRouter.get("/me", [protect], getLoggedInUserOrders);

/**
 * @desc Get order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
orderRouter.get("/:id", [protect, validId], getOrderById);

/**
 * @desc Update order to paid
 * @route PUT /api/orders/:id/pay
 * @access Private
 */
orderRouter.put("/:id/pay", [protect, validId], updateOrderToPaid);

export default orderRouter;
