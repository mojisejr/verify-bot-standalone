require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { slashCommand } = require("./../constants/config");

const commands = [
  new SlashCommandBuilder()
    .setName(slashCommand.verify.name)
    .setDescription(slashCommand.verify.message.description)
    .addStringOption((option) =>
      option
        .setName("wallet")
        .setDescription(slashCommand.verify.message.walletDefinition)
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName(slashCommand.reverify.name)
    .setDescription(slashCommand.reverify.message.description)
    .addStringOption((option) =>
      option
        .setName("oldwallet")
        .setDescription(slashCommand.reverify.message.oldWalletDefinition)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("newwallet")
        .setDescription(slashCommand.reverify.message.newWalletDefinition)
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: 9 }).setToken(process.env.token);

rest
  .put(
    Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
    { body: commands }
  )
  .then(() => console.log("OK! lets get punk it!"))
  .catch(console.error);
