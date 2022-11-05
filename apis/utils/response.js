function response(data, functionCall = null, message = null, success = true) {
  return {
    result: success,
    message: message,
    function_call: functionCall,
    data,
  };
}

module.exports = {
  response,
};
