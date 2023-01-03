require("dotenv").config();
const ethers = require("ethers");
const chalk = require("chalk");
const BKCMainnetUrl = process.env.bitkubMainnet;
const BKCProvider = new ethers.providers.JsonRpcProvider(BKCMainnetUrl);
const {
  giveRole,
  takeRole,
  takeMiningRole,
} = require("../discord/discord.role");

const { getHolderBalance } = require("../discord/discord.verify");
const { mines } = require("../freecity/contracts/mining.contract");

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

const { bot } = require("../discord/discord.bot");

const {
  getDataByWallet,
  updateVerificationStatus,
} = require("../csv/verify.service");

//tracking transfer event for give discord user a role and nickname
nft.on("Transfer", async (from, to, tokenId) => {
  console.log(
    chalk.bgGreenBright(`transfer from  = ${from} : ${to} tokenId: ${tokenId}`)
  );

  onTransferToMarket(to, from);
});

async function onTransferUpdateRole(wallet, mineAddr) {
  const holderData = await getDataByWallet(wallet);
  const balance = await getHolderBalance(wallet);

  if (balance > 0 && holderData != null && holderData.walletAddress == wallet) {
    console.log(`@${wallet} : is has balance`);
    await giveRole(bot, holderData.discordId);
    await updateVerificationStatus(holderData.discordId, wallet, balance, true);
  } else if (
    balance <= 0 &&
    holderData != null &&
    holderData.walletAddress == wallet
  ) {
    console.log(`@${wallet} : is has no balance`);
    await takeRole(bot, holderData.discordId);
    //check is to mine
    const mine = mines.find((m) => m == mineAddr);
    const stakedBalance = await mine.userInfos(holderData.walletAddress);
    if (stakedBalance <= 0 && holderData != undefined) {
      await takeMiningRole(bot, holderData.discordId);
      console.log(
        `${holderData.walletAddress} no longer the holder remove all role`
      );
    }

    await updateVerificationStatus(
      holderData.discordId,
      wallet,
      balance,
      false
    );
  } else {
    console.log(`transfer from non-verified holder. @${wallet}`);
  }
}

async function onTransferToMarket(to, from) {
  if (isMarketPlace(to)) {
    //market is to::
    await onTransferUpdateRole(from, to);
  } else if (isMarketPlace(from)) {
    //market is from ::
    await onTransferUpdateRole(to, from);
  } else {
    await onTransferUpdateRole(to);
    await onTransferUpdateRole(from);
  }
}

//check if receiver is marketplace
function isMarketPlace(to) {
  let marketPlaceAddress = [
    process.env.megalandMarketPlace,
    process.env.freecityMarketPlace,
    "0xD995B2cC01183268Ba124830E49963f3656f8e02",
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
