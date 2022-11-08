import { Router } from "express";
import {
    getLoggedInUser,
    loginUser,
    createUser,
    updateLoggedInUser,
    getUsers,
    deleteUser,
    getUser,
    updateUser,
} from "../controllers/userController.js";
import admin from "../middlewares/admin.js";
import protect from "../middlewares/protect.js";

const userRouter = Router();

userRouter.route("/").post(createUser).get([protect, admin], getUsers);

userRouter.route("/login").post(loginUser);

userRouter
    .route("/profile")
    .get([protect], getLoggedInUser)
    .put([protect], updateLoggedInUser);

userRouter
    .route("/:id")
    .all([protect, admin])
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

export default userRouter;
