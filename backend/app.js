const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");

// import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");



app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", products);
app.use("/api/v1", auth);

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
