const { App } = require("@slack/bolt");

/* 
This sample slack application uses SocketMode
For the companion getting started setup guide, 
see: https://slack.dev/bolt-js/tutorial/getting-started 
*/

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.message("muzo", async (payload) => {
  console.log(payload);
});

app.event("app_mention", async (payload) => {
  console.log(payload);
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
