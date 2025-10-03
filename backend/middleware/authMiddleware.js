
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
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
    next();
  });
};

module.exports = authMiddleware;
