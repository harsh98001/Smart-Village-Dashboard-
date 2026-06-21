const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const villageRoutes = require("./routes/villageRoutes");
const locationRoutes = require("./routes/locationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const assistantRoutes = require("./routes/assistantRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const clientBuildPath = path.resolve(__dirname, "../frontend/dist");
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Smart Village API is healthy",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/grievances", grievanceRoutes);

if (process.env.NODE_ENV === "production" && fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else if (process.env.NODE_ENV === "production") {
  console.warn(`Frontend build not found at ${clientBuildPath}. API-only mode is active.`);
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
