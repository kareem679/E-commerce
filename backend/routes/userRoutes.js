const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const validateRequest = require("../validation/ValidationRequest");
const authMiddleware = require("../middleware/authMiddleware");

const {register,logout,login,refreshTokenHandler,} = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must be between 3 and 20 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ min: 8, max: 50 })
      .withMessage("Email must be between 8 and 50 characters")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email already in use");
        }
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password must be between 8 and 30 characters"),
  ],
  validateRequest,
  register
);

// Login
router.post("/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ min: 8, max: 50 })
      .withMessage("Email must be between 8 and 50 characters"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password must be between 8 and 30 characters"),
  ],
  validateRequest,
  login
);

// Logout
router.post("/logout", authMiddleware, logout);

// Refresh Token
router.post("/refreshToken", refreshTokenHandler);

module.exports = router;
