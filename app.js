const { App } = require("@slack/bolt");
const mongoose = require("mongoose");
const controller = require("./controller.js");

mongoose.connect(process.env.MONGODB_URI, (error, connection) => {
  console.log(error || `Connected to MongoDB on port ${connection.port}`);

  return {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4,
  };
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.use(async ({ logger, context, client, say, ack, next, ...rest }) => {
  logger.info(rest);
  await next();
});

controller(app, mongoose);

(async () => {
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
