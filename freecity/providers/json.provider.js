const ethers = require("ethers");
const BKCMainnetUrl = "https://rpc.bitkubchain.io";
const BKCProvider = new ethers.providers.JsonRpcProvider(BKCMainnetUrl);

module.exports = BKCProvider;
