const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPEMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // wrong mongoose object id error
    if (err.name == "CastError") {
      const message = `Resource not found. Invalid:  ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // handling mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // handling wrong JWT error
    if (err.code === "JsonWebTokenError") {
      const message = "Json web token is invalid. Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    // handling expired JWT error
    if (err.code === "TokenExpiredError") {
      const message = "Json web token is expired. Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
