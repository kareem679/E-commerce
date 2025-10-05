const Cart = require("../models/Cart")
const mongoose = require("mongoose")


const addToCart = async (req,res)=>{
    try{
        const userId = req.user.id
        const {productId,quantity = 1} = req.body
        const qty = Number(quantity) || 1;

        // 1) جيب الكارت بتاع اليوزر لو موجود
        let cart = await Cart.findOne({userId})

        // 2) لو مفيش كارت: انشئ واحد وحط المنتج
        if(!cart){
            cart = await Cart.create({userId,products:[{productId:new mongoose.Types.ObjectId(productId),quantity:qty}]})
            await cart.populate("products.productId");
            return res.status(201).json(cart);
        }

          // 3) لو الكارت موجود: شوف اذا المنتج موجود
        const existing = cart.products.find(p=>p.productId.equals(productId));

        if(existing){
            existing.quantity += 1
        }else{
            cart.products.push({
                productId: new mongoose.Types.ObjectId(productId),quantity: qty})
        }

        // 4) حفظ وارجاع الكارت
        await cart.save()
        await cart.populate("products.productId")
        return res.status(200).json(cart)

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

const getCart = async (req,res) =>{
    try{
        const userId = req.user.id
        const cart = await Cart.findOne({userId}).populate("products.productId")
        if(!cart){
            return res.status(404).json({message:"Does't have cart"})
        }
        res.status(200).json({cart})
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

const negativeQuantity = async (req,res)=>{
    try{
        const userId = req.user.id
        const { productId } = req.body

        // 1) جيب الكارت بتاع اليوزر
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({message: "Cart not found"})
        }

        // 2) شوف المنتج موجود ولا لا
        const existing = cart.products.find(p=>p.productId.equals(productId))
        if(!existing){
            return res.status(404).json({message: "Product not found in cart"})
        }

        // 3) قلل الكمية
        existing.quantity -= 1

        // 4) لو الكمية بقت <= 0 امسح المنتج من الكارت
        if(existing.quantity <= 0){
            cart.products = cart.products.filter(p=>!p.productId.equals(productId));
        }
    
        // 5) احفظ الكارت وارجعه
        await cart.save()
        await cart.populate("products.productId");

        return res.status(200).json(cart)

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

const postiveQuantity = async (req,res)=>{
    try{
        const userId = req.user.id
        const { productId } = req.body
        
        // 1) جيب الكارت بتاع اليوزر
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({message: "Cart not found"})
        }

        // 2) شوف المنتج موجود ولا لا
        const existing = cart.products.find(p=>p.productId.equals(productId))
        if(!existing){
            return res.status(404).json({message: "Product not found in cart"})
        }


        // 3) لو الكمية اكبر من 50 يطلع رسالة خطء
        if(existing.quantity >= 50){
            return res.status(400).json({message: "Maximum quantity reached (50)"})
        }

        existing.quantity += 1;

        await cart.save()
        await cart.populate("products.productId");

        return res.status(200).json(cart)
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

const deleteCartProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const productId = req.params.productId;
    if (!productId) return res.status(400).json({ message: "productId is required" });

    
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    
    const exists = cart.products.some(p => p.productId.equals(productId));
    if (!exists) return res.status(404).json({ message: "Product not found in cart" });

    
    cart.products = cart.products.filter(p => !p.productId.equals(productId));

    
    if (cart.products.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Product removed. Cart is empty and deleted." });
    }

    
    await cart.save();
    await cart.populate("products.productId");

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {addToCart,getCart,negativeQuantity,postiveQuantity,deleteCartProduct}
