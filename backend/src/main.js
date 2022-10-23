import express from "express";
import cors from "cors";
import products from "./data/product.js";
import { NODE_ENV, PORT } from "./utils/env.js";
import connectToMongoDB from "./utils/db.js";

const app = express();

app.use(cors());

app.get("/health", (req, res) => {
    res.send(`<h1>${Date()}</h1>`);
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    res.json(products.find(p => p._id === req.params.id));
});

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Server Listening in ${NODE_ENV} mode on port ${PORT}`);
});
