import { Router } from "express";
import {register} from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validotor.middleware.js";
import { userRegistrationValidators } from "../validators/validators.js";

const routing=Router();

routing.route("/register").post(userRegistrationValidators(),validate,register);

export default routing;