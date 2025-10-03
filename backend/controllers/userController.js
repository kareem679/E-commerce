const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const genrateAccessToken = (user_id)=>{
    return jwt.sign(
        {id: user_id},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    )
}

const genrateRefreshToken = (user_id)=>{
    return jwt.sign(
        {id: user_id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"30d"}
    )
}


const register = async (req,res)=>{
    try{
        const {name,email,password} = req.body

        if(!email || !name || !password){
            return res.status(400).json({msg:"Pls fill all field"})
        }
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({msg:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({name,email,password:hashedPassword})

        const accessToken = genrateAccessToken(user._id)
        const refreshToken = genrateRefreshToken(user._id)

        res.cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite:"strict",
            maxAge: 30 * 24 * 60 * 1000,
        }).status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            accessToken
        })

    }catch(err){
        console.error("Error in Register",err)
        res.status(500).json({msg:"server error"})
    }
}

const logout = async (req,res)=>{
    try{
        res.clearCookie("refreshToken",{
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict"
        }).status(200).json({msg: "Loggout out successfully"})
    }catch(err){
        console.error("Error in logoutUser",err.msg)
        res.status(500).json({msg:"Server Error"})
    }
}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({msg:"please fill all inputs"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: "Wrong Email"})
        }
        const ismatch = bcrypt.compare(String(password),user.password)
        if(!ismatch){
            return res.status(400).json({msg: "Wrong password"})
        }

        const accessToken = genrateAccessToken(user._id)
        const refreshToken = genrateRefreshToken(user._id)

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        }).status(200).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            accessToken
        })


    }catch(err){
        console.error("Error in Login",err)
        res.status(500).json({msg: "Server error"})
    }
}

const refreshTokenHandler = async(req,res)=>{
    try{
        const token = req.cookies.refreshToken
        if(!token){
            return res.status(401).json({msg: "No Refresh token provider"})
        }

        jwt.verify(token,process.env.JWT_REFRESH_SECRET,(err,decoded)=>{
            if(err){
                return res.status(403).json({msg: "Invalid or expired refresh token"})
            }
            const newAccessToken = genrateAccessToken(decoded.id)

            res.status(200).json({accessToken: newAccessToken})

        })

    }catch(err){
        console.error("Error in refreshTokenHandler:", err.msg);
        res.status(500).json({ msg: "Server error" });
    }
}

module.exports = {register,logout,login,refreshTokenHandler} // all functions