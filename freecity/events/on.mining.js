const { mining, mines } = require("../contracts/mining.contract");
const { bot } = require("../../discord/discord.bot");
const { setMiningRole, takeMiningRole } = require("../../discord/discord.role");
const { getDataByWallet } = require("../../csv/verify.service");

console.log("Dig Dragon Mine Tracker Start!");

// mining.on("StakeTokens", async (staker, hashPower, tokensId) => {
//   console.log(`${staker} sent to mine`, {
//     staker: staker.toString(),
//     hashPower: hashPower.toString(),
//     tokens: tokensId.map((token) => token.toString()),
//   });

//   const holderData = await getDataByWallet(staker.toString());
//   const stakedBalance = await mine.userInfos(staker.toString());

//   if (stakedBalance > 0 && holderData != undefined) {
//     await setMiningRole(bot, holderData.discordId);
//     console.log(`${staker} goes to mine !`);
//   }
// });

// mining.on("UnstakeToken", async (unstaker, hashPower, tokensId) => {
//   console.log(`${unstaker} come back to wallet`, {
//     unstaker: unstaker.toString(),
//     hashPower: hashPower.toString(),
//     tokens: tokensId.map((token) => token.toString()),
//   });

//   const holderData = await getDataByWallet(unstaker.toString());
//   const stakedBalance = await mine.userInfos(unstaker.toString());
//   if (stakedBalance <= 0 && holderData != undefined) {
//     await takeMiningRole(bot, holderData.discordId);
//     console.log(`${unstaker} all came back to wallet not in mine (take role)`);
//   }
// });

mines.forEach((mine, index) => {
  mine.on("StakeTokens", async (staker, hashPower, tokensId) => {
    console.log(`mine index ${index}`);
    console.log(`${staker} sent to mine`, {
      staker: staker.toString(),
      hashPower: hashPower.toString(),
      tokens: tokensId.map((token) => token.toString()),
    });

    const holderData = await getDataByWallet(staker.toString());
    const stakedBalance = await mine.userInfos(staker.toString());

    if (stakedBalance > 0 && holderData != undefined) {
      await setMiningRole(bot, holderData.discordId);
      console.log(`${staker} goes to mine !`);
    }
  });

  mine.on("UnstakeToken", async (unstaker, hashPower, tokensId) => {
    console.log(`mine index ${index}`);
    console.log(`${unstaker} come back to wallet`, {
      unstaker: unstaker.toString(),
      hashPower: hashPower.toString(),
      tokens: tokensId.map((token) => token.toString()),
    });

    const holderData = await getDataByWallet(unstaker.toString());
    const stakedBalance = await mine.userInfos(unstaker.toString());
    if (stakedBalance <= 0 && holderData != undefined) {
      await takeMiningRole(bot, holderData.discordId);
      console.log(
        `${unstaker} all came back to wallet not in mine (take role)`
      );
    }
  });
});
