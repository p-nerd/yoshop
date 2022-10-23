import { Schema, model, Types } from "mongoose";

const reviewSchema = Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = Schema(
    {
        user: { type: Types.ObjectId, required: true, ref: "User" },
        name: { type: String, required: true },
        image: { type: String, required: true },
        brand: { type: String, required: true, default: false },
        category: { type: String, required: true },
        description: { type: String, required: true },
        reviews: { type: [reviewSchema] },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

const Product = model(productSchema, "Product");

export default Product;
