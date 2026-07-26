import { Router } from "express";
import authRouter from "../controllers/auth.controller.js"

const routing=Router();

routing.route("/register").post(authRouter);

export default routing;