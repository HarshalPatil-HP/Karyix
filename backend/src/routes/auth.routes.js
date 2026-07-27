import { Router } from "express";
import {login, logout, register} from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validotor.middleware.js";
import { userRegistrationValidators,userloginvalidators } from "../validators/validators.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const routing=Router();

routing.route("/register").post(userRegistrationValidators(),validate,register);
routing.route("/login").post(userloginvalidators(),validate,login);
routing.route("/logout").post(verifyJWT,logout);

export default routing;