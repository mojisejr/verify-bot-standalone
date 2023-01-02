const ethers = require("ethers");
const abi = require("../abis/freecity.mine.abi");
const provider = require("../providers/json.provider");
const address = "0xD995B2cC01183268Ba124830E49963f3656f8e02";
const mining = new ethers.Contract(address, abi, provider);
const mines = [
  new ethers.Contract(
    "0x4c20E44387282A58Ef1DE05d821904b8Fb1F666d",
    abi,
    provider
  ),
  new ethers.Contract(
    "0xD995B2cC01183268Ba124830E49963f3656f8e02",
    abi,
    provider
  ),
];

module.exports = { mining, mines };
