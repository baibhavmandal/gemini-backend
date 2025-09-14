import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";
import userMeController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", jwtAuth, userMeController);

export default router;
