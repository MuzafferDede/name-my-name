const view = async ({ ack, view, logger }) => {
  const result = await ack({
    response_action: "update",
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Role created",
      },
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Role:*\n${view.state.values.role.roleNameDefined.value}`,
            },
          ],
        },
      ],
    },
  });

  logger.info(result);
};

module.exports = view;
