const Project = require("../models/project");
const User = require("../models/user");

const view = async ({ ack, view, body, logger }) => {
  const value = view.state.values.project.projectNameDefined.value;

  const user = await User.findOneAndUpdate(
    { slackId: body.user.id },
    { slackId: body.user.id },
    { new: true, upsert: true }
  );

  const project = new Project({
    name: value,
    user: user._id,
  });

  project.save(async (err) => {
    if (err) {
      await ack("Error saving project");
      return;
    }

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
                text: `*Project:*\n${project.name}`,
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
