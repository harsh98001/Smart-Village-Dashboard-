const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");
const { seedDefaults } = require("./utils/seedDefaults");

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDefaults();

    app.listen(port, () => {
      console.log(`Smart Village API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start Smart Village API", error);
    process.exit(1);
  }
};

startServer();

