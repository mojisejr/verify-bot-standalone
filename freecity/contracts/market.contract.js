const ethers = require("ethers");
const abi = require("../abis/freecity.abi");
const provider = require("../providers/json.provider");
const freecity = "0xd7C1b83B1926Cc6971251D0676BAf239Ee7F804e";
const freecityMarketPlace = new ethers.Contract(freecity, abi, provider);

module.exports = freecityMarketPlace;
