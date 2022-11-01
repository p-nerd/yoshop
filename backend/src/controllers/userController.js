import wrap from "../middlewares/wrap.js";
import User from "../models/userModel.js";
import { hashString } from "../utils/hash.js";

export const loginUser = wrap(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordMatch = await user.matchPassword(password);

    if (user && isPasswordMatch) {
        const token = await user.getToken();

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        });
    }

    res.status(400);
    throw new Error("Invalid email or password");
});

export const getUser = wrap(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

export const createUser = wrap(async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            res.status(400);
            throw new Error("User already exits");
        }
        user = new User({ name, email, password });

        await user.save();
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: await user.getToken(),
        });
    } catch (e) {
        console.error(e);
        if (res.statusCode === 400) throw e;
        res.status(500);
        throw new Error("Internal server error in saving new user");
    }
});
