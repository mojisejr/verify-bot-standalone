const catchAsync = require("../utils/catchAcsync");
const appError = require("../utils/appError");
const { tokenOfOwnerURIs } = require("../../nft/services/nft.owner");
const {
  getAllVerifiedHolders,
  updateVerificationState,
} = require("../../database/sqlite/services/sqlite.holder.service");
const { response } = require("../utils/response");

const allHolders = catchAsync(async (req, res, next) => {
  const holders = await getAllVerifiedHolders();
  holders.length <= 0
    ? next(new appError(404, "allHolders", [], "no any holder founded"))
    : res.status(200).json(response(holders, "getVerifiedHolder"));
});

const updateHolderState = catchAsync(async (req, res, next) => {
  const { wallet, balance, status } = req.query;
  const result = await updateVerificationState(wallet, balance, status);
  result == false
    ? next(new appError(404, "updateHolderState", null, `${wallet} not found`))
    : res
        .status(200)
        .json(response(null, "updateHolderState", "Updated", result));
});

const getTokenOf = catchAsync(async (req, res, next) => {
  const { wallet } = req.query;
  const result = await tokenOfOwnerURIs(wallet);
  result.length <= 0
    ? next(new appError(404, "getTokenOf", result, "error no token found."))
    : res.status(200).json(response(result, "OK", "getTokenOf"));
});

module.exports = {
  allHolders,
  updateHolderState,
  getTokenOf,
};
