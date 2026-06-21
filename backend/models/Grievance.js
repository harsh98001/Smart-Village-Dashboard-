const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    grievanceId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    issueType: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    attachmentName: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["Filed", "In review", "Assigned", "Resolved"],
      default: "Filed"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Grievance", grievanceSchema);
