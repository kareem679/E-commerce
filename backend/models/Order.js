const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId:{type: mongoose.Schema.Types.ObjectId,ref: "User",required:true},
        products:[
            {
                productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
                quantity:{type:Number,required:true}
            }
        ],
        shoppingInfo:{
            fullname:{type:String,required:true},
            address:{type:String,required:true},
            phone:{type:Number,required:true},
            paymentMethod:{type:String,enum:["cash","visa"]}
        },
        status:{type:String,enum:["pending","processing","shipped","delivered","cancelled"],default:"pending"},
        totalPrice:{type:Number,required:true}
    },{timestamps:true}
)

module.exports = mongoose.model("Order",orderSchema)