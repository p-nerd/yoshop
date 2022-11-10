import { Router } from "express";
import { validId } from "../middlewares/validateMiddlewares.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";
import {
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter
    .route("/")
    .get(getProducts)
    .post([protect, admin], createProduct);

productRouter
    .route("/:id")
    .all([validId])
    .get(getProduct)
    .put([protect, admin], updateProduct)
    .delete([protect, admin], deleteProduct);

export default productRouter;
