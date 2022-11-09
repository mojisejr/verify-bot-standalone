const catchAsync = require("../utils/catchAcsync");
const appError = require("../utils/appError");
const { tokenOfOwnerURIs } = require("../../nft/services/nft.owner");
const {
  getAllVerifiedHolders,
  updateVerificationState,
} = require("../../database/sqlite/services/sqlite.holder.service");
const { response, responseData } = require("../utils/response");

const allHolders = catchAsync(async (req, res, next) => {
  const holders = await getAllVerifiedHolders().catch(e => console.log(e.message));
  return holders.length <= 0
    ? next(new appError("no any holder founded", 404, "allHolders" ))
    : responseData(res,holders, 200, "holders", "holde created");
});

const updateHolderState = catchAsync(async (req, res, next) => {
  const { wallet, balance, status } = req.query;
  const result = await updateVerificationState(wallet, balance, status);
  return result == false
    ? next(new appError(404, "updateHolderState", null, `${wallet} not found`))
    : responseData(res, result, 200, "updateHolderState", "updated")
});

const getTokenOf = catchAsync(async (req, res, next) => {
  const { wallet } = req.query;
  const result = await tokenOfOwnerURIs(wallet);
  return result.length <= 0
    ? next(new appError(404, "getTokenOf", result, "error no token found."))
    : res.status(200).json(response(result, "OK", "getTokenOf"));
});

module.exports = {
  allHolders,
  updateHolderState,
  getTokenOf,
};
