import User from "../models/userModel.js";
import { JWT_PRIVATE_KEY } from "../utils/env.js";
import { validateToken } from "../utils/jwt.js";
import wrap from "../utils/wrap.js";

export const protect = wrap(async (req, res, next) => {
    const authorization = req.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer")) {
        res.status(401);
        throw new Error("Not authorized, not token");
    }
    const token = authorization.split(" ")[1];
    try {
        const decodedPayload = await validateToken(token, JWT_PRIVATE_KEY);
        req.user = await User.findById(decodedPayload._id).select("-password");
        return next();
    } catch (e) {
        console.error(e);
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

export const admin = wrap(async (req, res, next) => {
    if (req.user.isAdmin === false) {
        res.status(401);
        throw new Error("User have to be admin");
    }
    return next();
});
