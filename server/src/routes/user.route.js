import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkisAdmin } from "../middlewares/isAdmin.middleware.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, getCurrentUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
