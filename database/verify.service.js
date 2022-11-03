// const { Collection } = require("./firestore");
const {
  newVerifiedHolder,
  updateVerificationState,
  getHolderByDiscordId,
  getHolderByDiscordName,
  deleteHolderData,
  getHolderByWallet,
} = require("../database/sqlite/services/sqlite.holder.service");

async function addVerifiedPunk(punkData) {
  const response = await newVerifiedHolder(punkData);
  return response;
}

async function updatePunkVerificationState(wallet, balance, status) {
  await updateVerificationState(wallet, balance, status);
}

async function getPunkByDiscordName(discordName) {
  const punk = await getHolderByDiscordName(discordName);
  return punk;
}

async function getPunkByDiscordId(discordId) {
  const punk = await getHolderByDiscordId(discordId);
  return punk;
}

async function getPunkByWallet(wallet) {
  const punk = await getHolderByWallet(wallet);
  return punk;
}

async function reverifyCheck(discordId, oldWallet) {
  // const snapshot = await Collection.Holder.doc(oldWallet).get();
  const found = await getHolderByWallet(oldWallet);
  if (found === undefined || found === null) {
    return {
      msg: "กระเป๋านี้ยังไม่ได้ verify เลยนะ ! ไป /gupunk ก่อนนะ [non-verified] 🥶",
      result: false,
    };
  } else {
    const discordOK = found.discordId == discordId;
    const walletOK = found.wallet == oldWallet;
    if (discordOK && walletOK) {
      return {
        result: true,
        msg: "กระเป๋านี้ผ่านการ verify มาแล้ว [wallet - ok]",
      };
    } else {
      return {
        result: false,
        msg: "verify ไปแล้วนี่นา กระเป๋าใบนี้ [already verified]",
      };
    }
  }
}

module.exports = {
  addVerifiedPunk,
  updatePunkVerificationState,
  getPunkByDiscordName,
  getPunkByDiscordId,
  getPunkByWallet,
  reverifyCheck,
  deleteHolderData,
};
