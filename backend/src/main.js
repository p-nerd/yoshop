import path from "node:path";
import colors from "colors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { development, NODE_ENV, PORT, production } from "./utils/env.js";
import { errHandler, notRoute } from "./middlewares/errorMiddlewares.js";
import connectToMongoDB from "./utils/db.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

const app = express();

if (NODE_ENV === development) {
    app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/uploads", uploadRouter);

const uploadsPath = path.join(path.resolve(), "..", "/uploads");
app.use("/uploads", express.static(uploadsPath));

if (NODE_ENV === production) {
    const distPath = path.join(path.resolve(), "..", "/frontend", "/dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
} else {
    app.use("/", (req, res) => res.json({ message: "API is running ..." }));
}

app.use(notRoute);
app.use(errHandler);

connectToMongoDB();
app.listen(PORT, () => {
    console.log(
        `Server Listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
});
