import { Router } from "express";
import { admin, protect } from "../middlewares/authMiddlewares.js";
import { validId } from "../middlewares/validateMiddlewares.js";
import {
    createOrder,
    getLoggedInUserOrders,
    getOrder,
    getOrders,
    updateOrderDeliveredField,
    updateOrderPaidField,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter
    .route("/")
    .all([protect])
    .post(createOrder)
    .get([admin], getOrders);

orderRouter
    .route("/me")
    .get([protect], getLoggedInUserOrders);

orderRouter
    .route("/:id")
    .all([validId])
    .get([protect], getOrder);

orderRouter
    .route("/:id/pay")
    .all([validId])
    .put([protect], updateOrderPaidField);

orderRouter
    .route("/:id/deliver")
    .all([validId])
    .put([protect, admin], updateOrderDeliveredField);



export default orderRouter;
