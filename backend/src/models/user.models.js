import { Schema } from "mongoose";


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
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            require:true,
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