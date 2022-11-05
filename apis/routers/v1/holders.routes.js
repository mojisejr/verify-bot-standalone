const express = require("express");
const {
  allHolders,
  updateHolderState,
  getTokenOf,
} = require("../../controllers/holder.controller");

const routes = express.Router();

routes.get("/", allHolders);
routes.get("/token", getTokenOf);
routes.put("/verify", updateHolderState);

module.exports = routes;
