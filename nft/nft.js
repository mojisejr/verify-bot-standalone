require("dotenv").config();
const ethers = require("ethers");
const chalk = require("chalk");
const BKCMainnetUrl = process.env.bitkubMainnet;
const BKCProvider = new ethers.providers.JsonRpcProvider(BKCMainnetUrl);
const {
  giveRole,
  takeRole,
  setZeroBalanceRole,
} = require("../discord/discord.role");
const { getHolderBalance } = require("../discord/discord.verify");

const nft = new ethers.Contract(
  process.env.nft,
  [
    "function tokenURI(uint256 _tokenId) view returns(string memory)",
    "function balanceOf(address owner) view returns(uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns(uint256)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  ],
  BKCProvider
);

const {
  getDataByWallet,
  updateVerificationStatus,
} = require("../csv/verify.service");

//tracking transfer event for give discord user a role and nickname
nft.on("Transfer", async (from, to, tokenId) => {
  console.log(
    chalk.bgGreenBright(`transfer from  = ${from} : ${to} tokenId: ${tokenId}`)
  );
  if (isMarketPlace(to)) {
    await onTransferUpdateRole(from);
  } else if (isMarketPlace(from)) {
    await onTransferUpdateRole(to);
  } else {
    await onTransferUpdateRole(to);
    await onTransferUpdateRole(from);
  }
});

async function onTransferUpdateRole(wallet) {
  const holderData = await getDataByWallet(wallet);
  const balance = await getHolderBalance(wallet);
  if (balance > 0 && holderData && holderData.wallet == wallet) {
    console.log(`@${wallet} : is has balance`);
    await giveRole(client, holderData.discordId);
    await updateVerificationStatus(wallet, balance, true);
  } else if (balance <= 0 && holderData && holderData.wallet == wallet) {
    console.log(`@${wallet} : is has no balance`);
    // await takeRole(client, holderData.discordId);
    await setZeroBalanceRole(client, holderData.discordId);
    await updateVerificationStatus(wallet, balance, false);
  } else {
    console.log(`transfer from non-verified holder. @${wallet}`);
  }
}

//check if receiver is marketplace
function isMarketPlace(to) {
  let marketPlaceAddress = [
    process.env.megalandMarketPlace,
    process.env.freecityMarketPlace,
  ];

  let middleAddress = "0xA51b0F76f0d7d558DFc0951CFD74BB85a70E2a95";

  const foundMarket = marketPlaceAddress.find((market) => market == to);

  if (to === foundMarket || to === middleAddress) {
    return true;
  } else {
    return false;
  }
}

module.exports = nft;
