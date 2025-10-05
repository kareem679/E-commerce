const express = require("express");
const { body,param, validationResult } = require("express-validator");
const validateRequest = require("../validation/ValidationRequest");
const authMiddleware = require("../middleware/authMiddleware");

const {store,index,show,update,deletes} = require("../controllers/productController")


const router = express.Router()


router.post("/",
  authMiddleware,
  [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3, max: 15 })
      .withMessage("name must be between 3 and 15 characters"),

    body("description")
      .optional()
      .isLength({ min: 4, max: 40 })
      .withMessage("description must be between 4 and 40 characters"),

    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isFloat({ min: 1, max: 5000 })
      .withMessage("price must be between 1 and 5000"),

    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("stock must be a positive integer"),

    body("category")
      .optional()
      .isString()
      .withMessage("category must be a string")
  ],
  validateRequest,
  store);
router.get("/",index)
router.get("/:id",[
    param("id")
      .isMongoId()
      .withMessage("Invalid product id"),
  ],
  validateRequest
  ,show)
router.put("/:id",authMiddleware,[
    param("id")
      .isMongoId()
      .withMessage("Invalid product id"),

    body("name")
      .optional()
      .isLength({ min: 3, max: 15 })
      .withMessage("name must be between 3 and 15 characters"),

    body("description")
      .optional()
      .isLength({ min: 4, max: 40 })
      .withMessage("description must be between 4 and 40 characters"),

    body("price")
      .optional()
      .isFloat({ min: 1, max: 5000 })
      .withMessage("price must be between 1 and 5000"),

    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("stock must be a positive integer"),

    body("category")
      .optional()
      .isString()
      .withMessage("category must be a string"),

    body("image")
      .optional()
      .isURL()
      .withMessage("image must be a valid URL"),
  ],
    validateRequest,
    update)
router.delete("/:id",authMiddleware,[
    param("id")
      .isMongoId()
      .withMessage("Invalid product id"),
  ],
  validateRequest
  ,deletes)

module.exports = router