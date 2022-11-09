import { Router } from "express";
import { validId } from "../middlewares/validate.js";
import {
    getProducts,
    getProductById,
    deleteProductById,
} from "../controllers/productController.js";
import protect from "../middlewares/protect.js";
import admin from "../middlewares/admin.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter
    .route("/:id")
    .all([validId])
    .get(getProductById)
    .delete([protect, admin], deleteProductById);

export default productRouter;
