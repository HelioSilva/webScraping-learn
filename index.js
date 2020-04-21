const sulla = require("sulla");
const functionMain = require("./src/sulla/initial");

sulla.create().then((client) => functionMain.start(client));
