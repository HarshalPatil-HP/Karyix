import { Router } from "express";
import {
    login,
    logout,
    register,
    currentUser,
    changePassword,
    verifyEmail,
    refreshAccessToken,
    forgetPassword,
    resetPass,
    resendEmailVerify
} from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validotor.middleware.js";
import { userRegistrationValidators, userloginvalidators } from "../validators/validators.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const routing = Router();

routing.route("/register").post(userRegistrationValidators(), validate, register);
routing.route("/login").post(userloginvalidators(), validate, login);
routing.route("/logout").post(verifyJWT, logout);
routing.route("/current-user").get(verifyJWT, currentUser);
routing.route("/change-password").post(verifyJWT, changePassword);
routing.route("/verify-email/:verificationToken").get(verifyEmail);
routing.route("/refresh-token").post(refreshAccessToken);
routing.route("/forget-password").post(forgetPassword);
routing.route("/reset-password/:verificationToken").post(resetPass);
routing.route("/resend-verify-email").post(resendEmailVerify);

export default routing;