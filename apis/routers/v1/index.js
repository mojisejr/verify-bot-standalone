const express = require("express");
const router = express.Router();

const holderRoutes = require("./holders.routes");

let defaultRoutes = [];

if (process.env.production == "PROD") {
  defaultRoutes = [
    {
      path: "/holder",
      route: holderRoutes,
    },
  ];
} else {
  defaultRoutes = [
    {
      path: "/holder",
      route: holderRoutes,
    },
  ];
}

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
