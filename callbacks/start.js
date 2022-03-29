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
              style: "primary",
              text: {
                type: "plain_text",
                text: "Search items",
              },
              action_id: "search_item",
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
