const callback = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "view_new_item",
      title: {
        type: "plain_text",
        text: "Create a new item",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      attachments: [
        {
          text: "Who wins the lifetime supply of chocolate?",
          fallback:
            "You could be telling the computer exactly what it can do with a lifetime supply of chocolate.",
          color: "#3AA3E3",
          attachment_type: "default",
          callback_id: "select_simple_1234",
          actions: [
            {
              name: "winners_list",
              text: "Who should win?",
              type: "select",
              data_source: "users",
            },
          ],
        },
      ],
      type: "modal",
    },
  });

  logger.info(result);
};

module.exports = callback;
