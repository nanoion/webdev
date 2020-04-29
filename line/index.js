"use strict";
const dotenv = require("dotenv");
dotenv.config();
const line = require("@line/bot-sdk");
const events = require("events");
const eventEmitter = new events.EventEmitter();
const express = require("express");
const cors = require("cors");
const app = express();
const expressWs = require("express-ws")(app);

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  req.testing = "testing";
  return next();
});
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.ws("/socket", (ws, req) => {
  eventEmitter.on("timeout", (msg) => {
    ws.send(JSON.stringify(msg));
  });
  console.log("socket", req.testing);
});

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  setTimeout(() => {
    eventEmitter.emit("timeout", {
      type: "timeout",
      token: event.replyToken,
      msg: event.message.text
    });
  }, 10000);

  // // use reply API
  // return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
