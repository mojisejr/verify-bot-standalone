require("dotenv").config();
const { remoteDatabase } = require("../../constants/config");
const axios = require("axios");

async function remoteAddVerifiedHolder({
  nftAddress,
  discordId,
  walletAddress,
  balance,
  verified,
}) {
  const response = await axios.post(
    `${process.env.remote_database}${remoteDatabase.newHolder}`,
    {
      nftAddress,
      discordId,
      walletAddress,
      balance,
      timestamp: new Date().getTime(),
      verified,
    }
  );

  return response.data.data;
}

async function remoteUpdateVerifiedHolder({
  walletAddress,
  discordId,
  balance,
  verified,
}) {
  const response = await axios.put(
    `${process.env.remote_database}/holder/${process.env.nft}/${discordId}`,
    {
      nftAddress: process.env.nft,
      discordId,
      walletAddress,
      balance,
      timestamp: new Date().getTime(),
      verified,
    }
  );
  console.log(response.data);
  return response.data;
}

async function remoteGetVerifiedHolders(nftAddress) {
  const response = await getHolders(nftAddress);
  const verified = response.filter((data) => data.verified === false);
  return verified;
}

async function remoteGetHolders(nftAddress) {
  const response = await axios.get(
    `${process.env.remote_database}/holder/${nftAddress}`
  );

  console.log(response.data.data);

  return response.data;
}

module.exports = {
  remoteAddVerifiedHolder,
  remoteUpdateVerifiedHolder,
  remoteGetHolders,
  remoteGetVerifiedHolders,
};
