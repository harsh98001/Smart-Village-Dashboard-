const ContactMessage = require("../models/ContactMessage");
const { writeAuditLog } = require("../utils/auditLogger");

const getContactMessages = async (_req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50);

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    next(error);
  }
};

const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Name, email, and message are required");
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      message
    });

    await writeAuditLog({
      action: "contact_message_created",
      actorEmail: email,
      targetType: "ContactMessage",
      targetId: contactMessage._id,
      details: {
        name,
        email
      }
    });

    res.status(201).json({
      success: true,
      message: "Contact message saved successfully",
      contactMessage
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactMessages,
  createContactMessage
};
