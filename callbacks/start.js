const callback = async ({ event, say }) => {
  await say({
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
              text: "Add new foundable",
            },
            action_id: "add_new_foundable",
          },
          {
            type: "button",
            style: "primary",
            text: {
              type: "plain_text",
              text: "Search foundables",
            },
            action_id: "search_foundable",
          },
          {
            type: "button",
            style: "danger",
            text: {
              type: "plain_text",
              text: "Manage your foundables",
            },
            action_id: "manage_foundable",
          },
        ],
      },
    ],
    text: `Hey there <@${event.user}>!`,
  });
};

module.exports = callback;
