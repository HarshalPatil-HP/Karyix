import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const errorlist = [];
    errors.array().map((err) => errorlist.push(
        {
            [err.path]: err.msg
        }
    ));
    
    return next(new ApiError(422, "Received data is not valid", errorlist));
};