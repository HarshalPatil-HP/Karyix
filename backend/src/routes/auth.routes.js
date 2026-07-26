import { Router } from "express";
import {register} from "../controllers/auth.controller.js"

const routing=Router();

routing.route("/register").post(register);

export default routing;