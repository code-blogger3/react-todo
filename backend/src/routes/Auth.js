import express from "express";

import { logOutUser, loginUser, registerUser } from "../controllers/Auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(logOutUser);

export { router as authRouter };
