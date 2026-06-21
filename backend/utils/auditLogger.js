const AuditLog = require("../models/AuditLog");

const writeAuditLog = async ({
  action,
  actor,
  actorEmail = "",
  targetType = "",
  targetId = "",
  details = {}
}) => {
  try {
    await AuditLog.create({
      action,
      actor: actor?._id || actor || undefined,
      actorEmail: actor?.email || actorEmail,
      targetType,
      targetId: String(targetId || ""),
      details
    });
  } catch (error) {
    console.error("Audit log write failed", error.message);
  }
};

module.exports = {
  writeAuditLog
};
