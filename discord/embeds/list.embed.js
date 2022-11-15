require("dotenv").config();
function createEmbedForListed(tokenName, tokenId, price, url, time) {
  const embed = {
    color: 0x9cff2e,
    title: `${tokenName} ListedAt ${price}`,
    url: `https://app.freecity.finance/nft/${process.env.nft}/${tokenId}?chain=bkc`,
    image: { url },
    timestamp: new Date(time),
    footer: {
      text: "👉 WhosHodl Standalone V1.0",
    },
  };
  return embed;
}

async function sendListedToDiscord(tokenName, tokenId, price, url, time, bot) {
  const embed = createEmbedForListed(tokenName, tokenId, price, url, time);
  const channel = bot.channels.cache.get(process.env.marketMonitorChannelId);
  if (channel) {
    channel.send({
      embeds: [embed],
    });
  }
}

module.exports = { sendListedToDiscord };
