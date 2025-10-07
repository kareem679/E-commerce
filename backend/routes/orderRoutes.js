const express = require("express");
const { body,param, validationResult } = require("express-validator");
const validateRequest = require("../validation/ValidationRequest");
const authMiddleware = require("../middleware/authMiddleware");


const {AddOrder,ShowOrder,RemoveOrder,ChangeStatus,GetAllOrder} = require("../controllers/orderController")

const router = express.Router()


router.post("/AddOrder",authMiddleware,[
    body("shoppingInfo.fullname").notEmpty().withMessage("fullName is required").isLength({min:8}).withMessage("Full name must be at least 8 characters"),
    body("shoppingInfo.address").notEmpty().withMessage("Address is required").isLength({min:5}).withMessage("Address must be at least 5 characters"),
    body("shoppingInfo.phone").notEmpty().withMessage("phone is required").isMobilePhone("ar-EG").withMessage("Invalid Egyptian phone number").isLength({min:11}).withMessage("phone must be at 11 charcters"),
    body("shoppingInfo.paymentMethod").notEmpty().withMessage("paymentMethod is required").isIn(["cash", "visa"]).withMessage("Payment method must be Cash or Card")
],validateRequest,AddOrder)
router.get("/ShowOrder",authMiddleware,ShowOrder)



//admins only
router.get("/GetAllOrder",authMiddleware,GetAllOrder)

router.delete("/RemoveOrder/:Order_Id"
    ,authMiddleware,[
    param("Order_Id").isMongoId().withMessage("Invaild Order_Id")
],validateRequest,RemoveOrder)

router.put("/ChangeStatus/:Order_Id",
    authMiddleware,[
    param("Order_Id").isMongoId().withMessage("Invaild Order_Id"),
    body("status").isIn(["pending","processing","shipped","delivered","cancelled"]).withMessage("status wrong")
],validateRequest,ChangeStatus)


module.exports = router