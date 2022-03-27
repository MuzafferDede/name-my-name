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

app.action("product_name", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say({
    blocks: [
      {
        dispatch_action: true,
        type: "input",
        element: {
          type: "plain_text_input",
          action_id: "product_name_value",
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

app.action("product_name_value", async ({ body, ack, say, ...rest }) => {
  console.log(body, rest);
  // Acknowledge the action
  await ack();
  await say(`You have entered ${body.value}`);
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
