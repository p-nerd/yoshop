import { Router } from "express";
import { protect, admin } from "../middlewares/authMiddlewares.js";
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

const userRouter = Router();

userRouter
    .route("/")
    .post(createUser)
    .get([protect, admin], getUsers);

userRouter
    .route("/login").post(loginUser);

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
