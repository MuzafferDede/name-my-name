const Role = require("../models/role");

const view = async ({ ack, view, logger }) => {
  const value = view.state.values.role.roleNameDefined.value;

  const role = new Role({
    name: value,
  });

  role.save(async (err) => {
    if (err) {
      await ack("Error saving role");
      return;
    }

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
                text: `*Role:*\n${role.name}`,
              },
            ],
          },
        ],
      },
    });

    logger.info(result);
  });
};

module.exports = view;
