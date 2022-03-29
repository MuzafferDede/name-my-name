const { App } = require("@slack/bolt");
const start = require("./callbacks/start.js");
const addNewFoundable = require("./callbacks/add-new-foundable.js");
const createNewProduct = require("./callbacks/create-new-product.js");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, (error, connection) => {
  console.log(error || `Connected to MongoDB on port ${connection.port}`);

  return {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4, // Use IPv4, skip trying IPv6
  };
});
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

app.event("app_home_opened", start);

app.action("add_new_foundable", addNewFoundable);

app.view("create_new_product_action", createNewProduct);

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
