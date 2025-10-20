import { body } from "express-validator";

export const signupValidation = [
  body("name", "Name is required").notEmpty(),
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  body("confirmPassword", "Confirm Password is required").notEmpty(),
];

export const loginValidation = [
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password is required").notEmpty(),
];
