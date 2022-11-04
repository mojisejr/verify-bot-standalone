require("dotenv").config();
require("./discord/discord.bot");
require("./nft");
// require("./megaland");
require("./freecity");

const express = require("express");
const chalk = require("chalk");
const http = require("http");
const sequelize = require("./database/sqlite/sqlite.database");
const PORT = process.env.PORT || 3002;

//==== express
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/alive", (req, res) => {
  res.status(200).json({
    result: "punk!",
  });
});

// run();
// startKeepAlive();

const server = http.createServer(app);

sequelize.sync().then(() => console.log(chalk.bgGreenBright("SQLITE: ONLINE")));
server.listen(PORT, () => {
  console.log(chalk.bgGreenBright("Market Tracker: ONLINE on port - ", PORT));
});
