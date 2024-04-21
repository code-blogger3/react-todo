import express from "express";

import { loginUser, registerUser } from "../controllers/Auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

export { router as authRouter };
