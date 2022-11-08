import { Router } from "express";
import {
    getUser,
    loginUser,
    createUser,
    updateUser,
    getUsers,
} from "../controllers/userController.js";
import admin from "../middlewares/admin.js";
import protect from "../middlewares/protect.js";

const userRouter = Router();

/**
 * @desc Create new user
 * @router POST /api/users
 * @access Public
 */
userRouter.post("/", createUser);

/**
 * @desc Auth user & get token
 * @router POST /api/users/login
 * @access Public
 */
userRouter.post("/login", loginUser);

/**
 * @desc Auth user & get token
 * @router GET /api/users/profile
 * @access Private
 */
userRouter.get("/profile", [protect], getUser);

/**
 * @desc Update user profile
 * @router PUT /api/users
 * @access Private
 */
userRouter.put("/", [protect], updateUser);

/**
 * @desc Get all users
 * @router GET /api/users
 * @access Private/Admin
 */
userRouter.get("/", [protect, admin], getUsers);

export default userRouter;
