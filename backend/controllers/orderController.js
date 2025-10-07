const Order = require("../models/Order")
const Cart = require("../models/Cart")
const mogoose = require("mongoose")


const AddOrder = async(req,res)=>{
    try{
        const userId = req.user.id

        const {shoppingInfo} = req.body

        if(!shoppingInfo.fullname || !shoppingInfo.address || !shoppingInfo.phone || !shoppingInfo.paymentMethod){
            return res.status(400).json({msg:"Invalid shipping info"});
        }

        const UserCart = await Cart.findOne({userId}).populate("products.productId")
        
        if(!UserCart || UserCart.products.length === 0){
            return res.status(400).json({msg:"Cart is empty"})
        }

        let totalPrice = 0
        const orderProducts = UserCart.products.map((item)=>{
            const price = item.productId.price
            const quantity = item.quantity
            totalPrice += price * quantity
            return {
                productId: item.productId._id,
                quantity
            }
        })

        const newOrder = await Order.create({userId,products:orderProducts,shoppingInfo: shoppingInfo,totalPrice})

        await Cart.findOneAndUpdate({userId},{products:[]})

        res.status(201).json(newOrder)

    }catch(err){
        console.error("Error in ",err)
        res.status(500).json({msg:"Server Error"})
    }
}

const ShowOrder = async (req,res)=>{
    try{
        const userId = req.user.id

        const userOrder = await Order.find({userId}).populate("products.productId")

        if(!userOrder || userOrder.length  === 0 ){
            return res.status(400).json({msg:"Order is empty"})
        }

        res.status(200).json(userOrder)

    }catch(err){
        console.error("Error in ",err)
        res.status(500).json({msg:"Server Error"})
    }
}




// admins only
const GetAllOrder = async(req,res)=>{
    try{
        const AllOrders = await Order.find().populate("products.productId")
     
        if(!AllOrders || AllOrders.length === 0){
            return res.status(404).json({msg:"Orders collection is empty"})
        }
        res.status(200).json(AllOrders)
    }catch(err){
        console.error("Error in ",err)
        res.status(500).json({msg:"Server Error"})
    }
}  

const RemoveOrder = async (req,res)=>{
    try{
        const {Order_Id} = req.params
        const Order_Deleted = await Order.findByIdAndDelete(Order_Id)
        if(!Order_Deleted){
            return res.status(404).json({msg:"order not found"})
        }
        res.status(200).json({msg:"Order Deleted"})
    }catch(err){
        console.error("Error in ",err)
        res.status(500).json({msg:"Server Error"})
    }
}

const ChangeStatus = async (req,res)=>{
    try{
        const {Order_Id} = req.params
        const {status} = req.body

        const UpdatedStatus = await Order.findByIdAndUpdate(Order_Id,{status},{new:true})

        if(!UpdatedStatus){
            return res.status(404).json({msg:"Order not found"})
        }
        res.status(200).json(UpdatedStatus)

    }catch(err){
        console.error("Error in ",err)
        res.status(500).json({msg:"Server Error"})
    }
}


module.exports = {AddOrder,ShowOrder,RemoveOrder,ChangeStatus,GetAllOrder}