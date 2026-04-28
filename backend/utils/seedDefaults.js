const User = require("../models/User");
const Village = require("../models/Village");
const Notification = require("../models/Notification");
const { buildVillageSeeds } = require("./sampleVillages");
const { buildNotificationSeeds } = require("./sampleNotifications");

const seedDefaults = async () => {
  let admin = await User.findOne({ email: "admin@smartvillage.in" });

  if (!admin) {
    admin = await User.create({
      name: "District Admin",
      email: "admin@smartvillage.in",
      password: "Admin@123",
      role: "admin",
      designation: "Smart Governance Officer",
      state: "India"
    });

  }

  const citizen = await User.findOne({ email: "citizen@smartvillage.in" });

  if (!citizen) {
    await User.create({
      name: "Citizen User",
      email: "citizen@smartvillage.in",
      password: "User@123",
      role: "user",
      designation: "Village Observer",
      state: "India"
    });
  }

  const villages = buildVillageSeeds();
  await Promise.all(
    villages.map((village) =>
      Village.findOneAndUpdate(
        { name: village.name, state: village.state },
        {
          $set: {
            ...village,
            updatedBy: admin._id
          }
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }
      )
    )
  );

  const notificationCount = await Notification.countDocuments();
  if (!notificationCount) {
    const notifications = buildNotificationSeeds().map((notification) => ({
      ...notification,
      createdBy: admin._id
    }));
    await Notification.insertMany(notifications);
  }
};

module.exports = {
  seedDefaults
};
