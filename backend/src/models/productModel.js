import { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: { type: Types.ObjectId, required: true, ref: "User" },
    },
    { timestamps: true }
);

const productSchema = Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        user: { type: Types.ObjectId, required: true, ref: "User" },
        countInStock: { type: Number, required: true, default: 0 },
        image: { type: String, required: true },
        brand: { type: String, required: true, default: false },
        category: { type: String, required: true },
        description: { type: String, required: true },
        reviews: { type: [reviewSchema] },
        numReviews: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
