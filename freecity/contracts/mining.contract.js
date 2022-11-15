const ethers = require("ethers");
const abi = require("../abis/freecity.mine.abi");
const provider = require("../providers/json.provider");
const address = "0xD995B2cC01183268Ba124830E49963f3656f8e02";
const mining = new ethers.Contract(address, abi, provider);

module.exports = mining;
