import { Router } from "express";
import { validId } from "../middlewares/validateMiddlewares.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";
import {
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProduct,
    createReview,
    getTopProducts,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter
    .route("/")
    .get(getProducts)
    .post([protect, admin], createProduct);

productRouter
    .route("/top")
    .get(getTopProducts)

productRouter
    .route("/:id")
    .all([validId])
    .get(getProduct)
    .put([protect, admin], updateProduct)
    .delete([protect, admin], deleteProduct);

productRouter
    .route("/:id/reviews")
    .all([validId])
    .post([protect], createReview);

export default productRouter;
