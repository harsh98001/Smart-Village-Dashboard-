const Village = require("../models/Village");

const getVillages = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 30);
    const search = (req.query.search || "").trim();
    const state = req.query.state;
    const soilType = req.query.soilType;
    const sector = req.query.sector;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
        { areaName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { searchTags: { $elemMatch: { $regex: search, $options: "i" } } }
      ];
    }

    if (state) {
      filter.state = state;
    }

    if (soilType) {
      filter.soilType = soilType;
    }

    if (sector) {
      filter.sector = sector;
    }

    const [villages, total] = await Promise.all([
      Village.find(filter)
        .sort({ growthIndex: -1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Village.countDocuments(filter)
    ]);

    res.json({
      success: true,
      villages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getVillageById = async (req, res, next) => {
  try {
    const village = await Village.findById(req.params.id).populate(
      "updatedBy",
      "name role designation"
    );

    if (!village) {
      res.status(404);
      throw new Error("Village not found");
    }

    res.json({
      success: true,
      village
    });
  } catch (error) {
    next(error);
  }
};

const createVillage = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      updatedBy: req.user._id
    };

    const village = await Village.create(payload);

    res.status(201).json({
      success: true,
      message: "Village created successfully",
      village
    });
  } catch (error) {
    next(error);
  }
};

const updateVillage = async (req, res, next) => {
  try {
    const village = await Village.findById(req.params.id);

    if (!village) {
      res.status(404);
      throw new Error("Village not found");
    }

    Object.assign(village, req.body, {
      updatedBy: req.user._id
    });

    await village.save();

    res.json({
      success: true,
      message: "Village updated successfully",
      village
    });
  } catch (error) {
    next(error);
  }
};

const deleteVillage = async (req, res, next) => {
  try {
    const village = await Village.findById(req.params.id);

    if (!village) {
      res.status(404);
      throw new Error("Village not found");
    }

    await village.deleteOne();

    res.json({
      success: true,
      message: "Village removed successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVillages,
  getVillageById,
  createVillage,
  updateVillage,
  deleteVillage
};
