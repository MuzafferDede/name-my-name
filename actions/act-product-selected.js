const Project = require("../models/project");

const action = async ({ ack, payload, body, ...rest }) => {
  console.log({ payload, body, rest });

  await ack();
};

module.exports = action;
