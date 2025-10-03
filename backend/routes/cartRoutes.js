const express = require("express");
const { body,param, validationResult } = require("express-validator");
const validateRequest = require("../validation/ValidationRequest");
const authMiddleware = require("../middleware/authMiddleware");

const {addToCart,getCart,negativeQuantity,postiveQuantity,deleteCartProduct} = require("../controllers/cartController")

const router = express.Router()


router.post("/store",authMiddleware,[
    body("productId").isMongoId().withMessage("Invalid productId"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1")
],validateRequest,addToCart)

router.get("/index",authMiddleware,getCart)

router.post("/negitave",authMiddleware,[
    body("productId").isMongoId().withMessage("Invalid productId")
],validateRequest,negativeQuantity)

router.post("/postive",authMiddleware,[
    body("productId").isMongoId().withMessage("Invalid productId")
],validateRequest,postiveQuantity)

router.delete("/delete/:productId",authMiddleware,[
    param("productId").isMongoId().withMessage("Invalid productId")
],validateRequest,deleteCartProduct)

module.exports = router