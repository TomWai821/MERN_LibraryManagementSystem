import { body } from 'express-validator'

export const UserRegisterRules =
[
    body("email").isEmail().withMessage("Invalid Email Address"), 
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("gender").notEmpty().withMessage(""),
    body("birthDay").isDate().withMessage("")
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