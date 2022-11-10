import Product from "../models/productModel.js";
import wrap from "../utils/wrap.js";

/**
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 */
export const getProducts = wrap(async (req, res, next) => {
    // throw new Error("Not Authorized");
    // setTimeout(async () => {
    const products = await Product.find();
    return res.json(products);
    // }, 5000);
});

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
export const getProduct = wrap(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error(`Product not found by id: ${productId}`);
    }
    return res.json(product);
});

/**
 * @desc Delete single product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
export const deleteProduct = wrap(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error(`Product not found by id: ${productId}`);
    }
    await Product.deleteOne({ _id: productId });
    return res.json({ message: `${productId} product deleted successfully` });
});

/**
 * @desc Update single product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
export const updateProduct = wrap(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error(`Product not found by id: ${productId}`);
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.image = req.body.image || product.image;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.numReviews = req.body.numReviews || product.numReviews;
    product.description = req.body.description || product.description;

    const updatedProduct = await product.save();
    return res.json(updatedProduct);
});

/**
 * @desc Create product with default data
 * @route POST /api/products
 * @access Private/Admin
 */
export const createProduct = wrap(async (req, res, next) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    });

    const createProduct = await product.save();
    return res.status(201).json(createProduct);
});
