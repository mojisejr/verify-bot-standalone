const parseDataObject = (data) => {
  let buffer = null;
  const isArray = data.hasOwnProperty("length");
  if (isArray) {
    buffer = data.map((r) => {
      return r.dataValues;
    });
  } else {
    buffer = data.dataValues;
  }
  return buffer;
};

module.exports = {
  parseDataObject,
};
