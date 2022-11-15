require("dotenv").config();
function createEmbedForSold(tokenName, tokenId, price, url, time) {
  const embed = {
    color: 0xff1e1e,
    title: `${tokenName} SoldAt ${price}`,
    url: `https://app.freecity.finance/nft/${process.env.nft}/${tokenId}?chain=bkc`,
    image: { url },
    timestamp: new Date(time),
    footer: {
      text: "👉 WhosHodl Standalone V1.0",
    },
  };
  return embed;
}

async function sendSoldToDiscord(tokenName, tokenId, price, url, time, bot) {
  const embed = createEmbedForSold(tokenName, tokenId, price, url, time);

  const channel = bot.channels.cache.get(process.env.marketMonitorChannelId);
  if (channel) {
    channel.send({
      embeds: [embed],
    });
  }
}

module.exports = { sendSoldToDiscord };
