require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const channelSecret = process.env.LINE_CHANNEL_SECRET;

// Parse JSON
app.use(bodyParser.json());

// Webhook endpoint
app.post("/webhook", (req, res) => {
  const events = req.body.events;

  events.forEach(event => {
    const userId = event.source.userId;
    console.log("👤 LINE User ID:", userId);

    // Check event type
    if (event.type === "follow") {
      console.log("✅ User followed the bot");
    } else if (event.type === "message") {
      console.log("📩 User sent a message");
    }
  });

  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});