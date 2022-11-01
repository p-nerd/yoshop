import { Schema, model } from "mongoose";
import { JWT_PRIVATE_KEY, JWT_EXPIRES_IN_MINUTE } from "../utils/env.js";
import { generateToken } from "../utils/jwt.js";
import { compareHash, hashString } from "../utils/hash.js";

const userSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compareHash(enteredPassword, this.password);
};

userSchema.methods.getToken = async function () {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin,
    };
    return await generateToken(payload, JWT_PRIVATE_KEY, JWT_EXPIRES_IN_MINUTE);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await hashString(this.password);
});

const User = model("User", userSchema);

export default User;
