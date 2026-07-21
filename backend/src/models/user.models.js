import { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10);
    next();
})

export const user=mongoose.model("User",userSchema);