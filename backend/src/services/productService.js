import Product from "../models/productModel.js";
import { Error404, Error500 } from "../utils/error.js";

export const getProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (e) {
        throw new Error500(e.message);
    }
};

export const getProduct = async productId => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error404(`Product not found by id: ${productId}`);
        }
        return product;
    } catch (e) {
        if (e.status && e.status === 404) {
            throw e;
        }
        throw new Error500(e);
    }
};
