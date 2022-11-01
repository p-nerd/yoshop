import { NODE_ENV } from "../utils/env.js";

export const notRoute = (req, res) => {
    res.status(404);
    throw new Error("Route not exist");
};

export const errHandler = (err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message;
    const stack = err ? (NODE_ENV === "production" ? undefined : err.stack) : undefined;
    return res.status(status).json({ message, stack });
};
