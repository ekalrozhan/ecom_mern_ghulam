const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// handle unhandle promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandle promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
