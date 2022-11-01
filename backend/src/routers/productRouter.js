import { Router } from "express";
import { validId } from "../middlewares/validate.js";
import {
    getProducts,
    getProductById,
} from "../controllers/productController.js";

const router = Router();

/**
 * @desc Fetch all products
 * @route GET /api/products/
 * @access Public
 */
router.get("/", getProducts);

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
router.get("/:id", [validId], getProductById);

export default router;
