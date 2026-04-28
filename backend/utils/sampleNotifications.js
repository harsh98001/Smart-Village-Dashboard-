const buildNotificationSeeds = () => [
  {
    title: "District Water Conservation Review",
    message:
      "All villages are requested to update pre-monsoon reservoir and pond desilting progress before Friday evening.",
    type: "alert",
    priority: "high",
    audience: "all"
  },
  {
    title: "Solar Pump Expansion Approved",
    message:
      "Phase-two renewable pump deployment has been approved for irrigation-focused villages in the western cluster.",
    type: "update",
    priority: "medium",
    audience: "all"
  },
  {
    title: "Admin Broadcast Window Open",
    message:
      "Administrators can now publish citizen-facing updates directly from the dashboard notification center.",
    type: "broadcast",
    priority: "medium",
    audience: "admin"
  },
  {
    title: "School Connectivity Benchmark Met",
    message:
      "Education services have crossed the 90 percent digital connectivity benchmark in high-priority pilot villages.",
    type: "update",
    priority: "low",
    audience: "users"
  }
];

module.exports = {
  buildNotificationSeeds
};

