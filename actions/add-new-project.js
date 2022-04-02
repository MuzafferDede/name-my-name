const callback = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "addNewProject",
      type: "modal",
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
          block_id: "project",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "projectNameDefined",
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
    },
  });

  logger.info(result);
};

module.exports = callback;
