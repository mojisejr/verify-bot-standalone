const { response } = require("../utils/response");
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.data = error.data || null;
  error.functionCall = error.functionCall || null;
  error.message = error.message || null;

  res
    .status(error.statusCode)
    .json(response(error.data, error.functionCall, error.message, false));
};
