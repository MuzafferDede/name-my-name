const Project = require("../models/project");

const action = async ({ ack, body, action, client, ...rest }) => {
  console.log("update project");

  await client.views.update({
    view_id: body.view.id,
    view: {
      title: body.view.title,
      callback_id: body.view.callback_id,
      submit: body.view.submit,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "hello World",
          },
        },
        ...body.view.blocks,
      ],
      blocks: blocks,
      type: body.view.type,
    },
  });
};

module.exports = action;
