require("dotenv").config();
const {
  addVerifiedPunk,
  updatePunkVerificationState,
  getPunkByDiscordName,
  getPunkByWallet,
} = require("../database/verify.service");

const remote = require("../apis/services/holder.service");

async function getDataByWallet(wallet) {
  const result = await getPunkByWallet(wallet);
  return result;
}

async function getDataByDiscord(discord) {
  const result = await getPunkByDiscordName(discord);
  return result;
}

async function updateVerificationStatus(discordId, wallet, balance, status) {
  // updatePunkVerificationState(wallet, balance, status);
  remote.updateHolder(discordId, process.env.nft, {
    nftAddress: process.env.nft,
    discordId,
    walletAddress: wallet,
    balance,
    verified: status,
  });
  console.log(`@${wallet} verification status updated to ${status}`);
}

async function saveVerifiedData({
  wallet,
  discordName,
  discordId,
  timestamp,
  lastbalance,
  verified,
}) {
  // const isVerified = await getDataByDiscord(discordName);
  // console.log("isVerified before save: ", isVerified);
  // if (isVerified) {
  //   console.log("address already registered");
  //   return false;
  // }

  await addVerifiedPunk({
    wallet,
    discordName,
    discordId,
    lastbalance,
    timestamp,
    verified,
  }).then(async () => {
    console.log(`@${wallet} passed and saved to database also remote database`);
    await remote.createNewHolder(
      process.env.nft,
      discordId,
      wallet,
      lastbalance,
      new Date().getTime(),
      true
    );
  });
  return true;
}

module.exports = {
  getDataByWallet,
  getDataByDiscord,
  updateVerificationStatus,
  saveVerifiedData,
};
