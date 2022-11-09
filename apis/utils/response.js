require("dotenv").config();
const { production } = process.env;
const responseData = (
  res,
  data,
  status,
  functionCall = null,
  message = null,
  result = true
) => {
  production == "PROD"
    ? res.status(status).json(prodResponse(result, status, message, data))
    : res
        .status(status)
        .json(devResponse(result, status, message, functionCall, data));
};

//@NON return development data object
function devResponse(result, status, message, functionCall, data) {
  return {
    result: result,
    status: status,
    message: message,
    functionCall: functionCall,
    data: data,
  };
}

//@NON return production data object
function prodResponse(result, status, message, data) {
  return {
    result: result,
    status: status,
    message: message,
    data: data,
  };
}

module.exports = {
  responseData,
};