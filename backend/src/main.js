import colors from "colors";
import express from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./utils/env.js";
import connectToMongoDB from "./utils/db.js";
import productRouter from "./routers/productRouter.js";
import { errHandler, notRoute } from "./middlewares/errors.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(notRoute);
app.use(errHandler);

connectToMongoDB();
app.listen(PORT, () => {
    console.log(
        `Server Listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
});
