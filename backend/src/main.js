import colors from "colors";
import express from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./utils/env.js";
import connectToMongoDB from "./utils/db.js";
import router from "./routes/productRouter.js";
import { errorHandler, notRoute } from "./middlewares/etc.js";

const app = express();

app.use(cors());
app.use("/api/products", router);
app.use(notRoute);
app.use(errorHandler);

connectToMongoDB();
app.listen(PORT, () => {
    console.log(`Server Listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
