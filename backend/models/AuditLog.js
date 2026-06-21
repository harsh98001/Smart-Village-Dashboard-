const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    actorEmail: {
      type: String,
      default: ""
    },
    targetType: {
      type: String,
      default: ""
    },
    targetId: {
      type: String,
      default: ""
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
