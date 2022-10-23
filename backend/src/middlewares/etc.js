import { eResponse } from "../utils/res.js";

export const wrap = handlerFunc => async (req, res, next) => {
    try {
        await handlerFunc(req, res, next);
    } catch (e) {
        return next(e);
    }
};

export const notRoute = (req, res) => {
    return eResponse(res, 404, "route not exit");
};

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    return eResponse(res, 500, err.message);
};
