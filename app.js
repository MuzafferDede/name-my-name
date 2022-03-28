const { App } = require("@slack/bolt");
const Product = require("./models/product.js");

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
              text: "Add new foundable",
            },
            action_id: "add_new_foundable",
          },
        ],
      },
    ],
    text: `Hey there <@${event.user}>!`,
  });
});

app.action("add_new_foundable", async ({ body, ack, say, client }) => {
  // Acknowledge the action
  await ack();
  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "create_new_product_action",
      title: {
        type: "plain_text",
        text: "Create a new foundable",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      blocks: [
        {
          block_id: "product",
          type: "input",
          element: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a product",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Good Wallet",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "One Account",
                  emoji: true,
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Financal Core",
                  emoji: true,
                },
                value: "value-2",
              },
            ],
            action_id: "product_select_action",
          },
          label: {
            type: "plain_text",
            text: "Product",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "project",
          type: "input",
          element: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a project",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "PGN",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "PE",
                  emoji: true,
                },
                value: "value-1",
              },
            ],
            action_id: "project_select_action",
          },
          label: {
            type: "plain_text",
            text: "Project",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "role",
          type: "input",
          element: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a role",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "PM",
                  emoji: true,
                },
                value: "value-4",
              },
              {
                text: {
                  type: "plain_text",
                  text: "UX",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "UI",
                  emoji: true,
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Frontend",
                  emoji: true,
                },
                value: "value-2",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Backend",
                  emoji: true,
                },
                value: "value-3",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Avengers",
                  emoji: true,
                },
                value: "value-4",
              },
            ],
            action_id: "role_select_action",
          },
          label: {
            type: "plain_text",
            text: "Role",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "foundable",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "thing_name_action",
            placeholder: {
              type: "plain_text",
              text: "e.g. PRD, Design Guideline, Report, etc.",
              emoji: true,
            },
          },
          label: {
            type: "plain_text",
            text: "Foundable's name",
            emoji: true,
          },
        },
        {
          block_id: "tag",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "plain_text_input-action",
            placeholder: {
              type: "plain_text",
              text: "e.g. v1.0, Python, Node.js, etc.",
              emoji: true,
            },
          },
          label: {
            type: "plain_text",
            text: "Tag",
            emoji: true,
          },
        },
      ],
      type: "modal",
    },
  });
});

app.view("create_new_product_action", ({ ack, view, ...rest }) => {
  console.log(view);
  console.log(rest);
  ack();
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
