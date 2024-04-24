import express from "express";

const router = express.Router();

router.route("/get");

export { router as todoRouter };
