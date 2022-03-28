const { App } = require("@slack/bolt");
const Product = require("./models/product.js");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, (error, connection) => {
  console.log(error || `${connection.port} connected`);

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

app.action("create_new_product", async ({ body, ack, say, client }) => {
  // Acknowledge the action
  await ack();
  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
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
          type: "input",
          element: {
            type: "multi_static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a product",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "*this is plain_text text*",
                  emoji: true,
                },
                value: "value-0",
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
          type: "input",
          element: {
            type: "multi_static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a project",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "*this is plain_text text*",
                  emoji: true,
                },
                value: "value-0",
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
          type: "input",
          element: {
            type: "multi_static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a role",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "*this is plain_text text*",
                  emoji: true,
                },
                value: "value-0",
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

app.action("product_name", async ({ body, payload, ack, say }) => {
  const product = new Product({
    name: payload.value,
    // user: user.id,
  });

  product.save((err) => {
    if (err) {
      return next({ status: 400, error: err.errors });
    }
  });
  await ack();
  await say({
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
        type: "input",
        element: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Select a product",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
                emoji: true,
              },
              value: "value-0",
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
        type: "input",
        element: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Select a project",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
                emoji: true,
              },
              value: "value-0",
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
        type: "input",
        element: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Select a role",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
                emoji: true,
              },
              value: "value-0",
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
  });
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
