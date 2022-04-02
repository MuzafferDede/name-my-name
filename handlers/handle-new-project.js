const Project = require("../models/project");

const view = async ({ ack, view, logger }) => {
  const value = view.state.values.project.projectNameDefined.value;

  const project = new Project({
    name: value,
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
