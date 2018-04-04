"use strict";

//mongoose file must be loaded before all other files in order to provide
// models to other modules
var mongoose = require("./config/mongoose"),
  express = require("express"),
  cors = require("cors");

mongoose();

var passportConfig = require("./passport");

//setup configuration for twitter login
passportConfig();

var app = express();

// enable cors
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
app.use(cors(corsOption));

//rest API requirements
require("./api/routes.js")(app);

app.listen(4000);
module.exports = app;

console.log(
  "\x1b[31m**************************************************************************\x1b[0m"
);
console.log(
  "\x1b[31m***                                                                    ***\x1b[0m"
);
console.log(
  "\x1b[31m***\x1b[0m     Welcome to  \x1b[36mYasser Hennawi\x1b[0m Backend for \x1b[36mTelepathy Labs\x1b[0m task     \x1b[31m***\x1b[0m"
);
console.log(
  "\x1b[31m***\x1b[0m              \x1b[32mServer running at http://localhost:4000\x1b[0m               \x1b[31m***\x1b[0m"
);
console.log(
  "\x1b[31m***                                                                    ***\x1b[0m"
);
console.log(
  "\x1b[31m**************************************************************************\x1b[0m"
);
