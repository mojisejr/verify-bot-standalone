const ethers = require("ethers");
const chalk = require("chalk");
const axios = require("axios");
//=== market bot
const { getFormattedPrice } = require("../helper/priceFormatter");

const { bot } = require("../discord/discord.bot");
const { createEmbedForListed } = require("../discord/embeds/list.embed");
const { createEmbedForSold } = require("../discord/embeds/sold.embed");

const BKCMainnetUrl = process.env.bitkubMainnet;
const BKCProvider = new ethers.providers.JsonRpcProvider(BKCMainnetUrl);

const freecityMarketPlace = new ethers.Contract(
  process.env.freecityMarketPlace,
  [
    "event Created(address,uint256,(uint256,uint8,address,address,uint256,uint8,address,uint256,uint256,uint8,address,uint256),(uint256,uint256,uint256,uint256,uint256))",
    "event Sold(address,uint256,(uint256,uint8,address,address,uint256,uint8,address,uint256,uint256,uint8,address,uint256),(uint256,uint256,uint256,uint256,uint256))",
    "function idToListing(uint256) view returns(uint256 listingId, address nftContract, uint256 tokenId, address exchangeToken, uint256 price, address seller, address buyer, uint256 createdAt, uint256 withdrawAt, uint256 soldAt, bool isKAP1155)",
  ],
  BKCProvider
);

const nft = new ethers.Contract(
  process.env.nft,
  [
    "function tokenURI(uint256 _tokenId) view returns(string memory)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  ],
  BKCProvider
);

freecityMarketPlace.on(
  "Created",
  async (seller, id, orderBook, orderBookMeta) => {
    const object = {
      seller,
      id,
      orderBook,
      orderBookMeta,
    };

    console.log("sell: ", object);
    // if (nftContract === process.env.nft) {
    //   console.log(chalk.yellowBright("[MarketPlace]: token listed."));
    //   const { price, exchangeToken } = await freecityMarketPlace.idToListing(
    //     listingId.toString()
    //   );
    //   const object = {
    //     seller,
    //     nftContract,
    //     tokenId: tokenId.toString(),
    //     price: getFormattedPrice(
    //       ethers.utils.formatEther(price.toString()).toString(),
    //       exchangeToken
    //     ),
    //     createdDate: new Date(createdAt.toString() * 1000).toLocaleDateString(
    //       "th-TH"
    //     ),
    //     createdTime: new Date(
    //       parseInt(createdAt.toString()) * 1000
    //     ).toLocaleTimeString("th-TH"),
    //   };
    //   console.log("KPUNK Listing detail: ", object);
    //   await sendListedToDiscord(object, bot);
    // }
  }
);

freecityMarketPlace.on("Sold", async (buyer, id, orderBook, orderBookMeta) => {
  const object = {
    buyer,
    id,
    orderBook,
    orderBookMeta,
  };

  console.log("buy: ", object);
  //   if (nftContract === process.env.nft) {
  //     console.log(chalk.bgGreenBright("[MarketPlace]: token sold."));
  //     const { price, exchangeToken } = await freecityMarketPlace.idToListing(
  //       listingId.toString()
  //     );
  //     const object = {
  //       listingId: listingId.toString(),
  //       buyer,
  //       nftContract,
  //       tokenId: tokenId.toString(),
  //       price: getFormattedPrice(
  //         ethers.utils.formatEther(price.toString()).toString(),
  //         exchangeToken
  //       ),
  //       soldDate: new Date(parseInt(soldAt.toString()) * 1000).toLocaleDateString(
  //         "th-TH"
  //       ),
  //       soldTime: new Date(parseInt(soldAt.toString()) * 1000).toLocaleTimeString(
  //         "th-TH"
  //       ),
  //     };
  //     await sendSoldToDiscord(object, bot);
  //   }
});

async function sendListedToDiscord(object, bot) {
  const tokenURI = await nft.tokenURI(object.tokenId);
  const jsonObj = await axios.get(tokenURI);

  const embed = createEmbedForListed(
    `${jsonObj.data.name} listed @${object.price}`,
    jsonObj.data.image
  );
  const channel = bot.channels.cache.get(process.env.marketMonitorChannelId);
  if (channel) {
    channel.send({
      embeds: [embed],
    });
  }
}

async function sendSoldToDiscord(object, bot) {
  const tokenURI = await nft.tokenURI(object.tokenId);
  const jsonObj = await axios.get(tokenURI);

  const embed = createEmbedForSold(
    `${jsonObj.data.name} Sold @${object.price}`,
    jsonObj.data.image
  );

  console.log("nft solding detail: ", object);

  const channel = bot.channels.cache.get(process.env.marketMonitorChannelId);
  if (channel) {
    channel.send({
      embeds: [embed],
    });
  }
}
