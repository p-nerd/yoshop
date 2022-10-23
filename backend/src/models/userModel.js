import { Schema, model } from "mongoose";

const userSchema = Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

const User = model(userSchema, "User");

export default User;
