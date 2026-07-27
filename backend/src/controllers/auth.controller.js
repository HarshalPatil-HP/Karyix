import asyncHandler from '../utils/async-handler.js';
import { sendEmail, emailVerificationContent, forgotPasswordContent } from '../utils/mail.js';
import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import { set } from 'mongoose';
const generateRefreshandAccessToken= async (userId)=>{
    try {
        const user= await User.findById(userId);
        const refresh=user.getRefreshToken();
        const access=user.getAccessToken();
    
        user.refreshToken=refresh;
        await user.save({ validateBeforeSave: false });
       return { accessToken: access, refreshToken: refresh };
    } catch (error) {
        throw new ApiError(500,
      "Something went wrong while generating access/refresh token");
    }
}

const register = asyncHandler(async (req, res) => {
    const {username,email,password,role}=req.body;

    if(!username||!email||!password){
        throw new ApiError(408,"enter all credentials")
    }
    
    const userExist= await User.findOne({
        $or:[
            {
                username
            },{
                email
            }
        ]
    });

    if(userExist){
        throw new ApiError(409,"user with this email or username already exist")
    }

    const user=await User.create({
        username,
        email,
        password, 
        role: role || 'user',
        isEmailVerified: false
    })

    if(!user){
        throw new ApiError(500,"user not created")
    }

    const {unhashed,hashed,tokenExpiry}=user.generateTemproryToken()

    user.emailVerificationToken=hashed;
    user.emailVerificationExpiry=tokenExpiry;

    await user.save({validateBeforeSave:false});

    await sendEmail({
        to:user?.email,
        subject:"plz verify your email",
        mailGenContent:emailVerificationContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashed}`
        )
    });

      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!createdUser) {
         throw new ApiError(500, "Something went wrong while registering a user");
    }

    return res
        .status(201)
        .json(
         new ApiResponse(
            200,
            { user: createdUser },
            "User registered successfully and verification email has been sent on your email",
      ),
    );
});

const login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

        if(!email){
            throw new ApiError(400,"enter your email")
        }
    
    const user=await User.findOne({email});
        if(!user){
            throw new ApiError(400,"user not exist")
        }
        
    const isPassValid = await user.isPasswordCorrect(password);
        if(!isPassValid){
            throw new ApiError(400,"Password is Incoorect")
        }

    const {accessToken,refreshToken}=await generateRefreshandAccessToken(user._id);
    
    const loggedUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );
    const options={
        httpOnly:true,
        secure:true
    }
    
    res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedUser,accessToken,refreshToken
            },
            "login successfull!"
        )
    )
    
    
});

const logout= asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 
            }

        },
        {
            returnDocument: 'after',
        }
    );

    const options={
        httpOnly:true,
        secure:true
    }
    
    res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "user logged out"
        )
    )

});
    
export {register,login,logout}

