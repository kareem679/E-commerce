
const mongoose = require("mongoose");


const userschema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            minlength:5,
            maxlength:50
        },
        password: {
            type: String,
            required: true,
            minlength:6,
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {timestamps: true}
)
module.exports = mongoose.model("User",userschema)