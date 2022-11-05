const nft = require("../nft");

async function tokenOfOwnerURIs(wallet) {
  let tokens = [];
  const balance = await nft.balanceOf(wallet);
  for (let i = 0; i < balance; i++) {
    const tokenId = await nft.tokenOfOwnerByIndex(wallet, i);
    const tokenURI = await nft.tokenURI(tokenId);
    tokens.push(tokenURI);
  }
  return tokens.length <= 0 ? [] : tokens;
}

module.exports = { tokenOfOwnerURIs };
