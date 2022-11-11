import path from "node:path";
import colors from "colors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { development, NODE_ENV, PORT } from "./utils/env.js";
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

app.use(notRoute);
app.use(errHandler);

connectToMongoDB();
app.listen(PORT, () => {
    console.log(
        `Server Listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
});
