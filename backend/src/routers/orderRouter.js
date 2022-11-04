import { Router } from "express";
import { createNewOrder } from "../controllers/orderController.js";
import protect from "../middlewares/protect.js";

const orderRouter = Router();

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private
 */
orderRouter.post("/", [protect], createNewOrder);

export default orderRouter;
