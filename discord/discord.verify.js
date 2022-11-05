const { ethers } = require("ethers");
const { verification } = require("../constants/config");

const {
  getDataByDiscord,
  saveVerifiedData,
  updateVerificationStatus,
} = require("../csv/verify.service");
const {
  reverifyCheck,
  deleteHolderData,
} = require("../database/verify.service");

const { giveRole } = require("./discord.role");

const BKCMainnetUrl = process.env.bitkubMainnet;
const BKCProvider = new ethers.providers.JsonRpcProvider(BKCMainnetUrl);

const nft = new ethers.Contract(
  process.env.nft,
  [
    "function tokenURI(uint256 _tokenId) view returns(string memory)",
    "function balanceOf(address _owner) view returns(uint256)",
  ],
  BKCProvider
);

//Check if holder have the right of verification
async function checkVerifyHolder(inputData, client, interaction) {
  const { wallet, discordId, discordName, timestamp } = inputData;

  const address = isValidAddress(wallet);
  if (address == null) {
    await interaction.editReply({
      content: "ตรวจสอบเลขกระเป๋าหน่อย อาจจะผิดนะ ! 🥹",
    });
    return;
  }

  // await interaction.reply("ขอตรวจกระเป๋าหน่อยนะ .. 🤖");
  const verified = await isVerified(discordName);

  const balance = await getHolderBalance(wallet);

  if (balance > 0 && !verified) {
    //set user as verified holder
    const result = await saveVerifiedData({
      wallet: address,
      discordName,
      discordId,
      timestamp,
      lastbalance: balance,
      verified: true,
    });

    if (result) {
      console.log(`@${wallet} verification done!`);
      await interaction.editReply(
        `@${discordName} ${verification.messages.verified}`
      );
      await giveRole(client, discordId);
    } else {
      //update to verified again
      console.log(
        `found address: @${wallet} update verification status to: ${true}`
      );
      await interaction.editReply(
        `@${discordName} ${verification.messages.comeback}`
      );
      const balance = await getHolderBalance(wallet);
      await updateVerificationStatus(wallet, balance, true);
      // .then(async () => {
      //   console.log("done update local ... update to remote database");
      //   await remoteUpdateVerifiedHolder({
      //     walletAddress: wallet,
      //     balance,
      //     discordId,
      //     verified: true,
      //   });
      // });
      await giveRole(client, discordId);
    }
  } else if (balance > 0 && verified) {
    console.log(`@${wallet} is verified. `);
    await interaction.editReply(
      `@${discordName} ${verification.messages.already}`
    );
    await updateVerificationStatus(wallet, balance, true);
    // .then(async () => {
    //   console.log("done update local ... update to remote database");
    //   await remoteUpdateVerifiedHolder({
    //     walletAddress: wallet,
    //     balance,
    //     discordId,
    //     verified: true,
    //   });
    // });
    await giveRole(client, discordId);
  } else {
    console.log(`@${wallet} has no punk!`);
    await interaction.editReply(
      `@${discordName} ${verification.messages.notFound} 🚧`
    );
  }
}

async function reverifyHolder(inputData, client, interaction) {
  //TODO:
  //1 check if oldwallet verify and exceute discordid is valid
  //2 check if new wallet has balance
  //3 delete old wallet id
  //4 add new wallet id
  //5 set role
  const { oldWallet, newWallet, discordName, timestamp } = inputData;
  const { result, msg } = await reverifyCheck(
    interaction.user.id,
    oldWallet,
    newWallet
  );
  const hasBalanceInNewWallet = await getHolderBalance(newWallet);
  if (result && hasBalanceInNewWallet > 0) {
    await deleteHolderData(oldWallet);
    await checkVerifyHolder(
      {
        wallet: newWallet,
        discordId: interaction.user.id,
        discordName,
        timestamp,
      },
      client,
      interaction
    );
  } else {
    await interaction.editReply({
      content: `🤓 ${msg}`,
    });
  }
}

//send message back to client
function sendBackMessage(message, client) {
  const channel = client.channels.cache.get(process.env.verifyChannelId);
  channel.send(message);
}

//check if valid address was sent
function isValidAddress(address) {
  let isAddress = address.split("0x");
  if (
    isAddress[0] == "" &&
    isAddress[1].length == 40 &&
    isAddress.length == 2
  ) {
    return address;
  } else {
    console.log("[isValidAddress]: Invalid address");
    return null;
  }
}

//get the balance of punk in use wallet
async function getHolderBalance(address) {
  if (address != null) {
    const tokenOfOwner = await nft.balanceOf(address);
    return parseInt(tokenOfOwner.toString());
  } else {
    return 0;
  }
}

//check if the sender is verified
async function isVerified(discordName) {
  const data = await getDataByDiscord(discordName);
  console.log(
    "[isVerified]: ",
    data != null ? data.verified : "No data = false"
  );

  if (data != null) {
    return data.verified ? true : false;
  } else {
    return false;
  }
}

module.exports = {
  checkVerifyHolder,
  reverifyHolder,
  isValidAddress,
  getHolderBalance,
  sendBackMessage,
};
