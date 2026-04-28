const dotenv = require("dotenv");
const connectDB = require("../config/db");
const { seedDefaults } = require("../utils/seedDefaults");

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    await seedDefaults();
    console.log("Seed completed");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed", error);
    process.exit(1);
  }
};

seed();
