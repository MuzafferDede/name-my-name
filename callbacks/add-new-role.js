const callback = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "create_new_role",
      title: {
        type: "plain_text",
        text: "Add new role",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      blocks: [
        {
          block_id: "role_name",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "add_role_action",
            placeholder: {
              type: "plain_text",
              text: "Frontend, Backend, etc.",
            },
          },
          label: {
            type: "plain_text",
            text: "Role Name",
          },
        },
      ],
      type: "modal",
    },
  });

  logger.info(result);
};

module.exports = callback;
