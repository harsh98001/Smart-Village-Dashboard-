const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["New", "Reviewed", "Closed"],
      default: "New"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
