import { Types } from "mongoose";
import { eResponse } from "../utils/res.js";

export const validId = (req, res, next) => {
    const id = req.params.id;
    const flag = Types.ObjectId.isValid(id);
    if (!flag) {
        return eResponse(res, 404, `Item not found by the id ${id}`);
    }
    return next();
};
