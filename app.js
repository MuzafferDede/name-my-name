const { App } = require("@slack/bolt");
const Product = require("./models/product.js");
const start = require("./start.js");

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
            action_id: "foundable_action",
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
          type: "divider",
        },
        {
          block_id: "tag",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "tag_action",
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
        {
          type: "divider",
        },
        {
          block_id: "url",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "url_action",
            placeholder: {
              type: "plain_text",
              text: "https://www.example.com/path/to/foundable",
              emoji: true,
            },
          },
          label: {
            type: "plain_text",
            text: "URL",
            emoji: true,
          },
        },
      ],
      type: "modal",
    },
  });
});

app.view("create_new_product_action", async ({ ack, view, client }) => {
  await ack({
    response_action: "update",
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Foundable created",
      },
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Product:*\n${view.state.values.product.product_select_action.selected_option.text.text}`,
            },
            {
              type: "mrkdwn",
              text: `*Project:*\n${view.state.values.project.project_select_action.selected_option.text.text}`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Role:*\n${view.state.values.role.role_select_action.selected_option.text.text}`,
            },
            {
              type: "mrkdwn",
              text: `*Foundable's name:*\n${view.state.values.foundable.foundable_action.value}`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Tag:*\n${view.state.values.tag.tag_action.value}`,
            },
            {
              type: "mrkdwn",
              text: `*URL:*\n<${view.state.values.url.url_action.value}|:earth_americas: Open>`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*${view.state.values.product.product_select_action.selected_option.text.text}* / *${view.state.values.project.project_select_action.selected_option.text.text}* / *${view.state.values.role.role_select_action.selected_option.text.text}* / *${view.state.values.foundable.foundable_action.value}* / *${view.state.values.tag.tag_action.value}*`,
            },
          ],
        },
      ],
    },
  });
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
