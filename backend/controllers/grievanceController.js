const Grievance = require("../models/Grievance");

const createGrievanceId = () =>
  `GR-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${String(Date.now()).slice(-5)}`;

const sanitizeGrievance = (grievance) => ({
  id: grievance.grievanceId,
  issueType: grievance.issueType,
  name: grievance.name,
  phone: grievance.phone,
  address: grievance.address,
  pincode: grievance.pincode,
  description: grievance.description,
  attachmentName: grievance.attachmentName,
  status: grievance.status,
  submittedAt: grievance.createdAt
});

const getGrievances = async (_req, res, next) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 }).limit(50);

    res.json({
      success: true,
      grievances: grievances.map(sanitizeGrievance)
    });
  } catch (error) {
    next(error);
  }
};

const createGrievance = async (req, res, next) => {
  try {
    const {
      issueType,
      name,
      phone,
      address,
      pincode,
      description,
      attachmentName
    } = req.body;

    if (!issueType || !name || !phone || !address || !pincode || !description) {
      res.status(400);
      throw new Error("Issue type, name, phone, address, pincode, and description are required");
    }

    if (!/^\d{10}$/.test(String(phone).trim())) {
      res.status(400);
      throw new Error("Mobile number must be 10 digits");
    }

    if (!/^\d{6}$/.test(String(pincode).trim())) {
      res.status(400);
      throw new Error("Pincode must be 6 digits");
    }

    const grievance = await Grievance.create({
      grievanceId: createGrievanceId(),
      issueType,
      name,
      phone,
      address,
      pincode,
      description,
      attachmentName: attachmentName || ""
    });

    res.status(201).json({
      success: true,
      message: "Grievance filed successfully",
      grievance: sanitizeGrievance(grievance)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGrievances,
  createGrievance
};
