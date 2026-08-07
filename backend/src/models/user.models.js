import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";

const userSchema=new Schema(
    {
        avatar: {
            type:{
                url:String,
                localpath:String
            },
             default: {
                url: `https://placehold.co/200x200`,
                localPath: "",
            },
        },
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
             unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            trim:true
        },
         password: {
            type: String,
            required: [true, "Password is required"],
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
         emailVerificationExpiry: {
            type: Date,
        },
    },
    {
        timestamps:true,
    },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAccessToken=function (){
    return jwt.sign(
        {
         _id:this._id,
         email:this.email,
         username:this.username   
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.getRefreshToken=function (){
    return jwt.sign(
        {
         _id:this._id   
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateTemproryToken=function(){
    const unhashed=crypto.randomBytes(10).toString("hex")


    const hashed=crypto
                .createHash("sha256")
                .update(unhashed)
                .digest("hex")
    
    const tokenExpiry=Date.now()+(20*60*1000)    //20m
    
    
    return {
        unhashed,
        hashed,
        tokenExpiry
    };
}

export const User = mongoose.model("User", userSchema);