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

app.message("hello", async ({ message, say }) => {
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

app.event("app_home_opened", async ({ event, say }) => {
  console.log("app opened");
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${event.user}>! Welcome back! How can i help you today?`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Create new Product",
            },
            action_id: "create_new_product",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Create new Project",
            },
            action_id: "create_new_project",
          },
        ],
      },
    ],
    text: `Hey there <@${event.user}>!`,
  });
});

app.action("create_new_product", async ({ body, ack, say }) => {
  console.log("create_new_product");

  // Acknowledge the action
  await ack();
  await say({
    blocks: [
      {
        dispatch_action: true,
        type: "input",
        element: {
          type: "plain_text_input",
          action_id: "product_name",
        },
        label: {
          type: "plain_text",
          text: "Product Name",
          emoji: true,
        },
      },
    ],
    text: `Hey there <@${body.message.user}>!`,
  });
});

app.action("product_name", async ({ body, payload, ack, say }) => {
  console.log("product_name");
  // Acknowledge the action
  await ack();
  await say(`You have entered ${payload.value}`);
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
