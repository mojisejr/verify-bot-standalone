class appError extends Error {
  constructor(statusCode, functionCall, data, message) {
    super(message);

    this.statusCode = statusCode;
    this.functionCall = functionCall;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.data = data;
    this.result = false;
    this.isOperational = true;

    Error.captureStackTrace(this, this.contructor);
  }
}

module.exports = appError;
