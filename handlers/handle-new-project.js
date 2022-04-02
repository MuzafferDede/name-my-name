const view = async ({ ack, view, logger }) => {
  const result = await ack({
    response_action: "update",
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Project created",
      },
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Project:*\n${view.state.values.project.projectNameDefined.value}`,
            },
          ],
        },
      ],
    },
  });

  logger.info(result);
};

module.exports = view;
