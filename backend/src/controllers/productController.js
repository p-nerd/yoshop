import Product from "../models/productModel.js";
import wrap from "../middlewares/wrap.js";

export const getProducts = wrap(async (req, res, next) => {
    // throw new Error("Not Authorized");
    // setTimeout(async () => {
    const products = await Product.find();
    return res.json(products);
    // }, 5000);
})

export const getProductById = wrap(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error(`Product not found by id: ${productId}`);
    }
    return res.json(product);
});
