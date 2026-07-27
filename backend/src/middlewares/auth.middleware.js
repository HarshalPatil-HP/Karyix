import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"unauthorized request")
    }

    try {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = User.findById(decoded?._id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(401,"Invalid Access request")
        }
        req.user=user;


        next();
    } catch (error) {
        throw new ApiError(401,"unauthorized request")
    }
});