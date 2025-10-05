const Product = require("../models/Product")

const store = async (req,res)=>{
    try{
        const {name,description,price,image,stock,category} = req.body

        if(!name || !price){
            return res.status(400).json({msg:"Please fill name and price inputs"})
        }

        const product = await Product.create({name,description,price,image,stock})
        res.status(201).json(product)
    }catch(err){
        console.error("Error in Store in  ProductController",err.msg)
        res.status(500).json({msg:"Server error"})
    }
}

const index = async (req,res)=>{
    try{
        const products = await Product.find();
        if(!products){
            return res.status(404).json({msg:"not found any product"})
        }
        res.status(200).json(products)
    }catch(err){
        console.error("Error in getProducts:",err.msg)
        res.status(500).json({msg: "Server error"})
    }
}

const show = async (req,res) =>{
    try{
        const oneproduct = await Product.findById(req.params.id)
        if(!oneproduct){
            return res.status(404).json({msg:"Product not found"})
        }
        res.status(200).json(oneproduct)
    }catch(err){
        console.error("Error in show in productscontroller",err.msg);
        res.status(500).json({msg:"Server Error"})
    }
}

const update = async (req,res)=>{
    try{
        const allowedUpdates = ["name", "description", "price","image","stock","category"]; 
        const updates = {};

        allowedUpdates.forEach((field)=>{
            if(req.body[field] !== undefined){
                updates[field] = req.body[field];
            }
        })
        if(!updates){
            return res.status(400).json({msg:"Update inputs is empty!!!"})
        }

        const oneproduct = await Product.findByIdAndUpdate(req.params.id,updates,{new:true})

        res.status(200).json(oneproduct)
    }catch(err){
        console.error("Error in show in productscontroller",err.msg);
        res.status(500).json({msg:"Server Error"})
    }
}

const deletes = async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({msg:"product not found"})
        res.status(200).json({msg:"Product Deleted successfullly"})
    }catch(err){
        console.error("Error in deleteProduct",err.msg)
        res.status(500).json({msg:"Server Error"})
    }
}


module.exports = {store,index,show,update,deletes}