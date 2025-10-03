require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const configdb = require("./config/db");
const path = require("path")


const cartRoutes = require("./routes/cartRoutes")
const productsRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const server = express();

// Middleware

server.use(cookieParser());
server.use(express.json());
server.use("/image", express.static(path.join(process.cwd(), "image")));
server.use(cors({
    origin: "http://localhost:3000", 
    credentials: true // عشان يسمح بالـ cookies
}));

// Connect MongoDB


configdb();

// Routes
server.use("/api/users", userRoutes);
server.use("/api/products",productsRoutes)
server.use("/api/cart",cartRoutes)

// Catch all route (optional)
server.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server ready on http://localhost:${PORT} ✅`);
});
