import colors from "colors";
import express from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./utils/env.js";
import connectToMongoDB from "./utils/db.js";
import { getProduct, getProducts } from "./services/productService.js";

const app = express();

app.use(cors());

app.get("/health", (req, res) => {
    res.send(`<h1>${Date()}</h1>`);
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await getProducts();
        return res.json(products);
    } catch (e) {
        return res.status(e.status).json({ message: e.message });
    }
});

app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await getProduct(req.params.id);
        return res.json(product);
    } catch (e) {
        return res.status(e.status).json({ message: e.message });
    }
});

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Server Listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
