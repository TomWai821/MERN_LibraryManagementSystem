import { body } from 'express-validator'

export const UserRegisterRules =
[
    body("email").isEmail().withMessage("Invalid Email Address"), 
    body("username").notEmpty().withMessage("Username is required").isLength({min: 3}).withMessage("Password require at least 3 characters"),
    body("password").notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password require at least 6 characters"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("birthDay").notEmpty().withMessage("BirthDay is required")
];

export const UserLoginRules = 
[
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password").notEmpty().withMessage("Password is required")
]

export const UserChangeDataRules = 
[
    body("oldUsername").optional().isString(),
    body("newUsername").optional().isString(),
    body("oldPassword").optional().isString(),
    body("newPassword").optional().isString()
]