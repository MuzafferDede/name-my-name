const event = async ({ event, client, logger }) => {
  const result = await client.views.publish({
    user_id: event.user,
    view: {
      type: "home",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${event.user}>, *Good* to have you back! How can i help you today?`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Items",
            emoji: true,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add new item",
              },
              action_id: "addNewItem",
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Manage",
            emoji: true,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              style: "primary",
              text: {
                type: "plain_text",
                text: "Search items",
              },
              action_id: "searchItems",
            },
            {
              type: "button",
              style: "danger",
              text: {
                type: "plain_text",
                text: "Manage your items",
              },
              action_id: "manageItems",
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Administration",
            emoji: true,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add new product",
              },
              action_id: "addNewProduct",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add new project",
              },
              action_id: "addNewProject",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add new role",
              },
              action_id: "addNewRole",
            },
          ],
        },
      ],
    },
  });
};

module.exports = event;
