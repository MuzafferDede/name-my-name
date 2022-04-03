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
          block_id: "role",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "roleNameDefined",
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
    },
  });
};

module.exports = action;
