import { body } from "express-validator";

const userRegistrationValidators = () => {
    return [
        body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores")
    .escape(), 

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 , max: 20 }).withMessage("Password must be at least 6 characters long"),
   
  body("fullName")
    .optional({ checkFalsy: true }) 
    .trim()
    .isString().withMessage("Full name must be text")
    .isLength({ max: 50 }).withMessage("Full name cannot exceed 50 characters")
    .escape()
    ]
};

const userloginvalidators=()=>{
  return [
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 , max: 20 }).withMessage("Password must be at least 6 characters long")
  ]
}

const changePasswordValidators = () => {
    return [
        body("oldPass")
            .notEmpty().withMessage("Old password is required"),

        body("newPass")
            .notEmpty().withMessage("New password is required")
            .isLength({ min: 6, max: 20 }).withMessage("New password must be 6-20 characters long")
    ]
};

const forgetPasswordValidators = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Please provide a valid email address")
            .normalizeEmail()
    ]
};

const resetPassValidators = () => {
    return [
        body("newpass")
            .notEmpty().withMessage("New password is required")
            .isLength({ min: 6, max: 20 }).withMessage("Password must be 6-20 characters long")
    ]
};

const resendEmailVerifyValidators = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Please provide a valid email address")
            .normalizeEmail()
    ]
};

export {
    userRegistrationValidators,
    userloginvalidators,
    changePasswordValidators,
    forgetPasswordValidators,
    resetPassValidators,
    resendEmailVerifyValidators
}