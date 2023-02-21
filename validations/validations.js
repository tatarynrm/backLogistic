import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("firstName").isLength({ min: 2 }),
  body("lastName").isLength({ min: 2 }),
];
export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

// export const postCreateValidation =[

// ]
