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
}

module.exports = {
  remoteAddVerifiedHolder,
  remoteUpdateVerifiedHolder,
};
