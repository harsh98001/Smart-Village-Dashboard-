const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { writeAuditLog } = require("../utils/auditLogger");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "smart-village-secret", {
    expiresIn: "7d"
  });

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  state: user.state,
  designation: user.designation,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt
});

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role, state, designation } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("An account with this email already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "user",
      state: state || "India",
      designation:
        designation ||
        (role === "admin" ? "District Operations Lead" : "Community Observer")
    });

    await writeAuditLog({
      action: "user_signup",
      actor: user,
      targetType: "User",
      targetId: user._id,
      details: {
        role: user.role,
        state: user.state,
        designation: user.designation
      }
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token: generateToken(user._id),
      user: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    user.lastLoginAt = new Date();
    await user.save();

    await writeAuditLog({
      action: "user_login",
      actor: user,
      targetType: "User",
      targetId: user._id,
      details: {
        role: user.role,
        state: user.state
      }
    });

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: sanitizeUser(req.user)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getProfile
};
