import { Router } from "express";
import {login, register} from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validotor.middleware.js";
import { userRegistrationValidators,userloginvalidators } from "../validators/validators.js";

const routing=Router();

routing.route("/register").post(userRegistrationValidators(),validate,register);
routing.route("/login").post(userloginvalidators(),validate,login);

export default routing;