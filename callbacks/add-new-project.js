const callback = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "create_new_project",
      title: {
        type: "plain_text",
        text: "Add new project",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      blocks: [
        {
          block_id: "project_name",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "add_project_action",
            placeholder: {
              type: "plain_text",
              text: "e.g PE, PPE, etc.",
            },
          },
          label: {
            type: "plain_text",
            text: "Project Name",
          },
        },
      ],
      type: "modal",
    },
  });

  logger.info(result);
};

module.exports = callback;
