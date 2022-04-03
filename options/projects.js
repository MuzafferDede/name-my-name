const Project = require("../models/project");

const option = async ({ ack, body, action, client, logger, ...rest }) => {
  console.log("arrived");
  await ack();

  return {
    options: [
      {
        text: {
          type: "plain_text",
          text: "This is from external",
        },
      },
    ],
  };
};

module.exports = option;
