require("dotenv").config();
const axios = require("axios");
const { remote_database } = process.env;
const baseRoute = "holder";
/**
 *
 * @param {string} nftAddress
 * @param {string} discordId
 * @param {string} walletAddress
 * @param {string} balance
 * @param {number} timestamp
 * @param {boolean} verified
 * @returns
 */

const createNewHolder = async (
  nftAddress,
  discordId,
  walletAddress,
  balance,
  timestamp,
  verified
) => {
  const response = await axios.post(`${remote_database}/${baseRoute}/new`, {
    nftAddress,
    discordId,
    walletAddress,
    balance,
    timestamp,
    verified,
  }).catch(e => console.log("ERROR !!!! ", e.message));


  return response.data;
};

const getAllHolders = async () => {
  const response = await axios.get(`${remote_database}/${baseRoute}`);
  console.log(response.data);
  return response.data;
};




const getAllHoldersByNft = async (nftAddress) => {
  const response = await axios.get(
    `${remote_database}/${baseRoute}/${nftAddress}`
  );
  return response.data;
};

const getHolder = async (discordId, nftAddress) => {
  const response = await axios.get(
    `${remote_database}/${baseRoute}/${nftAddress}/${discordId}`
  );

  return response.data;
};

const getHolderByWallet = async (wallet, nftAddress) => {
  const response = await axios
    .get(`${remote_database}/${baseRoute}/wallet/${process.env.nft}/${wallet}`)
    .catch((e) => console.log("getHolderByWallet: ", e.message));


  return response == undefined ? null : response.data.data;
};


const updateHolder = async (discordId, nftAddress, data) => {
  const response = await axios.put(
    `${remote_database}/${baseRoute}/${nftAddress}/${discordId}`,
    { discordId, nftAddress, data }
  );

  return response.data;
};

const updateVerifyStatus = async (discordId, nftAddress, verified) => {
  await Holder.update({ verified }, { where: { discordId, nftAddress } });
};

const updateHolderBalance = async (discordId, nftAddress, balance) => {
  await Holder.update({ balance }, { where: { discordId, nftAddress } });
};

// const deleteHolder = async (discordId, nftAddress) => {
//   await Holder.delete({ where: { discordId, nftAddress } });
// };

module.exports = {
  createNewHolder,
  getAllHolders,
  getAllHoldersByNft,
  getHolder,
  getHolderByWallet,
  updateHolderBalance,
  updateVerifyStatus,
  updateHolder,
  //   deleteHolder,
};
