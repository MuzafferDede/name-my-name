const callback = async ({ event, client, logger }) => {
  const result = await client.views.publish({
    user_id: event.user,
    view: {
      type: "home",
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
                text: "Add new item",
              },
              action_id: "add_new_item",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add new product",
              },
              action_id: "add_new_product",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add new project",
              },
              action_id: "add_new_project",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add new role",
              },
              action_id: "add_new_role",
            },
          ],
        },
        {
          type: "divider",
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
              action_id: "search_items",
            },
            {
              type: "button",
              style: "danger",
              text: {
                type: "plain_text",
                text: "Manage your items",
              },
              action_id: "manage_items",
            },
          ],
        },
      ],
    },
  });

  logger.info(result);
};

module.exports = callback;
