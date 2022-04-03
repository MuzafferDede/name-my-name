const Project = require("../models/project");

const action = async ({ ack, body, action, ...rest }) => {
  console.log("update project");
  await ack({
    response_action: "update",
    view: {
      type: "modal",
      callback_id: "handleNewItem",
      title: {
        type: "plain_text",
        text: "Hello World",
      },
    },
  });
};

module.exports = action;
