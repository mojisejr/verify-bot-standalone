const { Client, Intents } = require("discord.js");
const { checkVerifyHolder, reverifyHolder } = require("./discord.verify");
const { slashCommand } = require("../constants/config");
const chalk = require("chalk");

const intents = new Intents();

intents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS
);

const client = new Client({
  intents,
});

client.once("ready", async () => {
  console.log(chalk.bgGreenBright("WHOsHODL: ONLINE"));
});

client.login(process.env.token);

//reverification
client.on("interactionCreate", async (interaction) => {
  try {
    if (
      interaction.isCommand() &&
      interaction.commandName == slashCommand.reverify.name
    ) {
      const inputData = {
        oldWallet: interaction.options.data[0].value,
        newWallet: interaction.options.data[1].value,
        discordId: interaction.user.id,
        discordName: interaction.user.tag,
        timestamp: Date.now(),
      };
      if (!interaction.deferred) {
        await interaction.deferReply({ ephemeral: true });
      }

      await reverifyHolder(inputData, client, interaction);
      return;
    }
  } catch (e) {
    console.log(e);
    if (!interaction.deferred) {
      await interaction.deferReply({ ephemeral: true });
    }
    await interaction.editReply("🤯 มีบางอย่างผิดปกติมากๆ ติดต่อ non | KPUNK!");
    return;
  }
});

//verification
client.on("interactionCreate", async (interaction) => {
  //format data
  try {
    if (
      interaction.isCommand() &&
      interaction.commandName == slashCommand.verify.name
    ) {
      const inputData = {
        wallet: interaction.options.data[0].value,
        discordId: interaction.user.id,
        discordName: interaction.user.tag,
        timestamp: Date.now(),
      };
      if (!interaction.deferred) {
        await interaction.deferReply({ ephemeral: true });
      }

      //verify check
      await checkVerifyHolder(inputData, client, interaction);
      return;
    }
  } catch (e) {
    console.log(e);
    if (!interaction.deferred) {
      await interaction.deferReply({ ephemeral: true });
    }
    await interaction.editReply({
      content: "🤯 มีบางอย่างผิดปกติมากๆ ติดต่อ non | KPUNK!",
    });
    return;
  }
});

process.on("uncaughtException", (error) => {
  console.log(error);
});

module.exports = {
  bot: client,
};
