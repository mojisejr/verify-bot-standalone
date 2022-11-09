class appError extends Error {
  constructor(
    message,
    statusCode,
    functionCall = null,
    result = false,
    data = null
  ) {
    super(message);
    this.result = result;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.functionCall = functionCall;
    this.isOperational = true;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = appError;