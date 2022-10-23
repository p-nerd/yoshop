import express from "express";
import cors from "cors";
import products from "./data/product.js";
import { PORT } from "./utils/env.js";

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
