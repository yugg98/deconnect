const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

connectDatabase();

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const server = app.listen(3000, () => {
  console.log(`Server is working on http://localhost:3000`);
});

require("dotenv").config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name:'yug',
  api_key: '159366218959158',
  api_secret: '_wzwti2vjFfXkEDQGLxGoKJVhfI',
});



process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});