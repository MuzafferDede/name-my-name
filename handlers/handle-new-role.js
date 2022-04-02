const Role = require("../models/role");
const User = require("../models/user");

const view = async ({ ack, view, body, logger }) => {
  const value = view.state.values.role.roleNameDefined.value;

  const user = await User.findOneAndUpdate(
    { slackId: body.user.id },
    { slackId: body.user.id },
    { new: true, upsert: true }
  );

  const role = new Role({
    name: value,
    user: user._id,
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
