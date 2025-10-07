const jwt = require("jsonwebtoken");


const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    req.user = decoded; 

    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admins only" });
    }

    next();
  });
};

module.exports = adminMiddleware;