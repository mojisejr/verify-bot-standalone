const { MessageEmbed } = require("discord.js");
function createEmbedForListed(title, uri) {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(title)
    .setImage(uri)
    .setTimestamp(new Date());
  return embed;
}

module.exports = { createEmbedForListed };
