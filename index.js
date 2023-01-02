require("dotenv").config();
require("./discord/discord.bot");
require("./nft");
require("./megaland");
require("./freecity");

const express = require("express");
const chalk = require("chalk");
const http = require("http");
const cors = require("cors");
const router = require("./apis/routers/v1");
const sequelize = require("./database/sqlite/sqlite.database");
const appError = require("./apis/utils/appError");
const globleErrorController = require("./apis/controllers/error.controller");

const PORT = process.env.PORT || 4200;

const whitelist =
  process.env.production == "PROD"
    ? ["http://188.166.65.114:3000", "http://188.166.65.114:3003"]
    : [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
      ];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require(`${
    process.env.production === "PROD" ? "./swagger.json" : "./swagger_dev.json"
  }`);

//==== express
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1", router);
app.all("*", (req, res, next) => {
  next(new appError(`[${req.originalUrl}] Not Found`, 404, "global"));
});

app.use(globleErrorController);

const server = http.createServer(app);
console.log(chalk.bgRedBright("RUNNING MODE: ", process.env.production));
sequelize
  .sync()
  .then(() => console.log(chalk.bgGreenBright("Database: ONLINE")));
server.listen(PORT, () => {
  console.log(chalk.bgGreenBright("API: ONLINE on port - ", PORT));
});
