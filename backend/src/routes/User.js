import express from "express";
import { updateUserTodoCategoryList } from "../controllers/User.js";

const router = express.Router();

router.route("/updateTodoCategoryList/:userID").put(updateUserTodoCategoryList);

export { router as userRouter };
