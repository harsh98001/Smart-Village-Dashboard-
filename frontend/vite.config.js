const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  root: path.resolve(__dirname),
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true
  }
});

