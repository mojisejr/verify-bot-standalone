const freecityMarketPlace = require("../contracts/market.contract");
const { parseOrderBookAndMeta } = require("../utils/market.parser");
const { sendListedToDiscord } = require("../../discord/embeds/list.embed");
const { sendSoldToDiscord } = require("../../discord/embeds/sold.embed");
const { bot } = require("../../discord/discord.bot");

console.log("freecity market: ", process.env.freecityMarketPlace);
console.log("Freecity market tracker started !");

freecityMarketPlace.on(
  "Created",
  async (seller, id, orderBook, orderBookMeta, event) => {
    const {
      itemName,
      itemId,
      itemPriceString,
      itemImage,
      createdAt,
      itemAddr,
    } = await parseOrderBookAndMeta(orderBook, orderBookMeta, process.env.nft);
    if (itemAddr === process.env.nft) {
      await sendListedToDiscord(
        itemName,
        itemId,
        itemPriceString,
        itemImage,
        createdAt,
        bot
      );
    }
  }
);

freecityMarketPlace.on(
  "Sold",
  async (buyer, id, orderBook, orderBookMeta, event) => {
    const { itemName, itemId, itemPriceString, itemImage, createdAt } =
      await parseOrderBookAndMeta(orderBook, orderBookMeta, process.env.nft);
    if (itemAddr === process.env.nft) {
      await sendSoldToDiscord(
        itemName,
        itemId,
        itemPriceString,
        itemImage,
        createdAt,
        bot
      );
    }
  }
);
