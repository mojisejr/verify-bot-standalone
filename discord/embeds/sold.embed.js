const { MessageEmbed } = require("discord.js");
function createEmbedForSold(title, uri) {
  const embed = new MessageEmbed()
    .setColor("#B20600")
    .setTitle(title)
    .setImage(uri)
    .setTimestamp(new Date());
  return embed;
}

module.exports = { createEmbedForSold };
