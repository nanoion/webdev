const dotenv = require("dotenv");
dotenv.config();
const line = require("@line/bot-sdk");
const moment = require("moment");
const events = require("events");
const eventEmitter = new events.EventEmitter();
const express = require("express");
const cors = require("cors");
const app = express();

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);
var alertUsers = [];

// create Express app
var corsOptions = {
  origin: "http://localhost:9000",
  credentials: true,
};

// Add CORS origin for hostname: localhost:9000
app.use(cors(corsOptions));

// Webhook endpoint for receive messages from LINE server
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

eventEmitter.on("timeout", (timeout) => {

      alertUsers.map((user) => {
        client.pushMessage(user, {
          type: "text",
          text:
            "Reply Timeout - " +
            moment(timeout.timestamp).fromNow() +
            ":\n  " +
            timeout.msg,
        });
      });
});

// Handle receive message events
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // Add user for receive notification
  if (event.message.text == "/setalertuser") {
    alertUsers.push(event.source.userId);

    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "Add alert user complete!",
    });
  } else {

      // Set timeout for 10 sec, if not reply within 10 sec.
      setTimeout(() => {
        eventEmitter.emit("timeout", {
          type: "timeout",
          token: event.replyToken,
          msg: event.message.text,
          timestamp: event.timestamp,
        });
      }, 10000); // Delay 10 sec.
  }
}

// listen on port
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
