import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";

const routing=Router();

routing.route("/").get(healthCheck)

export default routing;