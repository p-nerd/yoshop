import { Router } from "express";
import Product from "../models/productModel.js";
import { wrap } from "../middlewares/etc.js";
import { eResponse, response } from "../utils/res.js";
import { validId } from "../middlewares/validate.js";

const router = Router();

/**
 * @desc Fetch all products
 * @route GET /api/products/
 * @access Public
 */
router.get(
    "/",
    wrap(async (req, res, next) => {
        const products = await Product.find();
        return response(res, 200, products);
    })
);

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
router.get(
    "/:id",
    [validId],
    wrap(async (req, res, next) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return eResponse(res, 404, `Product not found by id: ${productId}`);
        }
        return response(res, 200, product);
    })
);

export default router;
