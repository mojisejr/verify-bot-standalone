require("dotenv").config();
const tokenContracts = require("../contracts/token.contract");
const { ethers } = require("ethers");
const provider = require("../providers/json.provider");
const axios = require("axios");

const tokenTypes = {
  0: "KUB",
  1: "ERC20",
  2: "ERC721",
  3: "ERC1155",
};

async function parseOrderBookAndMeta(orderBook, meta, nftAddr) {
  const [
    id,
    status,
    seller,
    buyer,
    itemId,
    itemType,
    itemAddr,
    itemAmount,
    acceptedTokenId,
    acceptedTokenType,
    acceptedTokenAddr,
    acceptedTokenAmount,
  ] = orderBook.toString().split(",");

  const [_, createdAt, updatedAt, cancelledAt, soldAt] = meta
    .toString()
    .split(",");

  const nft = new ethers.Contract(
    nftAddr,
    [
      "function tokenURI(uint256 _tokenId) view returns(string memory)",
      "function balanceOf(address owner) view returns(uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) view returns(uint256)",
      "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    ],
    provider
  );

  const tokenUri = await nft.tokenURI(itemId);
  const { image, name, attributes } = (await axios.get(tokenUri)).data;
  const parsedAttributes = attributes.map((attribute) => {
    return {
      trait_type: attribute.trait_type.toString(),
      value: attribute.value.toString(),
    };
  });

  const data = {
    id: id.toString() || null,
    status: status.toString() || null,
    seller: seller.toString() || null,
    buyer: buyer.toString() || null,
    itemId: itemId.toString() || null,
    itemType: tokenTypes[itemType.toString()] || null,
    itemAddr: itemAddr.toString() || null,
    itemAmount: itemAmount.toString() || null,
    acceptedTokenId: acceptedTokenId.toString() || null,
    acceptedTokenType: tokenTypes[acceptedTokenType.toString()] || null,
    acceptedTokenAddr: acceptedTokenAddr.toString() || null,
    acceptedTokenAmount: acceptedTokenAmount.toString() || null,
    itemPriceString:
      `${ethers.utils.formatUnits(acceptedTokenAmount.toString(), 18)} ${
        tokenContracts[acceptedTokenAddr.toString()] == undefined
          ? "KUB?"
          : tokenContracts[acceptedTokenAddr.toString()]
      }` || null,
    itemImage: image,
    itemName: name,
    itemAttributes: parsedAttributes,
    createdAt: createdAt.toString() || null,
    updatedAt: updatedAt.toString() || null,
    cancelledAt: cancelledAt.toString() || null,
    soldAt: soldAt.toString() || null,
  };

  //   console.log("data", data);

  return data;
}

// const data = {
//   orderBook:
//     "4237,0,0x4C06524B1bd7AA002747252257bBE0C472735A6D,0x0000000000000000000000000000000000000000,18,2,0x7C80f994C724b0C8F834F4303C4f142004798219,1,0,1,0x7d984C24d2499D840eB3b7016077164e15E5faA6,9999000000000000000000",
//   meta: "4237,1668517214,1668517214,0,0",
// };

// parseOrderBookAndMeta(
//   data.orderBook,
//   data.meta,
//   "0x7C80f994C724b0C8F834F4303C4f142004798219"
// );

module.exports = {
  parseOrderBookAndMeta,
};
