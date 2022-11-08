import wrap from "./wrap.js";

const admin = wrap(async (req, res, next) => {
    if (req.user.isAdmin === false) {
        res.status(401);
        throw new Error("User have to be admin");
    }
    return next();
});

export default admin;
