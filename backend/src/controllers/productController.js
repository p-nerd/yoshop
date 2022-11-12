import Product from "../models/productModel.js";
import wrap from "../utils/wrap.js";

/**
 * @desc Fetch all products
 * @route GET /api/products?
 *            keyword=<search keyword>&
 *            pageNumber=<Page number>&
 *            pageSize=<PageSize>
 * @access Public
 */
export const getProducts = wrap(async (req, res, next) => {
    const pageSize = Number(req.query.pageSize) || 15;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: "i",
              },
          }
        : {};

    const productCount = await Product.count({ ...keyword });

    const products = await Product.find({ ...keyword })
        .populate("user", "name email")
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize);
    return res.json({
        products,
        pageNumber,
        pagesCount: Math.ceil(productCount / pageSize),
    });
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

/**
 * @desc Upload file
 * @route POST /api/uploads
 * @access Private/Admin
 */
export const uploadFile = wrap(async (req, res, next) => {
    return res.status(201).json({ fileName: `${req.file.filename}` });
});

/**
 * @desc Create new review
 * @route POST /api/products/:id/reviews
 * @access Private
 */
export const createReview = wrap(async (req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error(`Product not found by id: ${productId}`);
    }

    const alreadyReviewed = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
        res.status(400);
        throw new Error(`Product already reviewed`);
    }

    const { rating, comment } = req.body;

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    const updatedProduct = await product.save();
    return res.status(201).json(updatedProduct);
});

/**
 * @desc Get top rated products
 * @route GET /api/products/top
 * @access Public
 */
export const getTopProducts = wrap(async (req, res, next) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    return res.status(200).json(products);
});
