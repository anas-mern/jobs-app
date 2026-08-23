const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const errorHandle = (err, req, res, next) => {
  const message = err.message || "Something went wrong";
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ success: false, message });
};


module.exports = errorHandle;
