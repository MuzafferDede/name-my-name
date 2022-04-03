const 

const action = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "handleManageItems",
      type: "modal",
      title: {
        type: "plain_text",
        text: "Your items",
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Select an item to manage",
          },
        },
      ],
    },
  });
};

module.exports = action;
