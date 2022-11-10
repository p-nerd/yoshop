import { Types } from "mongoose";

export const validId = (req, res, next) => {
    const id = req.params.id;
    const flag = Types.ObjectId.isValid(id);
    if (!flag) {
        res.status(404);
        throw new Error(`Item not found by the id ${id}`);
    }
    return next();
};
