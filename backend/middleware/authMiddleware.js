const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      res.status(401);
      throw new Error("Authentication token is missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "smart-village-secret");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User account was not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    return next(new Error("Admin access is required"));
  }

  next();
};

module.exports = {
  protect,
  adminOnly
};

