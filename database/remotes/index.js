require("dotenv").config();
const { remoteDatabase } = require("../../constants/config");
const axios = require("axios");

async function remoteAddVerifiedHolder({
  nftAddress,
  discordId,
  walletAddress,
  verified,
}) {
  const response = await axios.post(
    `${process.env.remote_database}/${remoteDatabase.newHolder}`,
    {
      nftAddress,
      discordId,
      walletAddress,
      timestamp: new Date().getTime(),
      verified,
    }
  );

  console.log(response.data);
  return response.data;
}

async function remoteUpdateVerifiedHolder({ nftAddress, discordId, verified }) {
  const response = await axios.put(
    `${process.env.remote_database}/${remoteDatabase.updateHolder}/${nftAddress}/${discordId}`,
    {
      nftAddress,
      discordId,
      walletAddress,
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
    `${process.env.remote_database}/${nftAddress}`
  );

  return response.data;
}

module.exports = {
  remoteAddVerifiedHolder,
  remoteUpdateVerifiedHolder,
  remoteGetHolders,
  remoteGetVerifiedHolders,
};
