const Project = require("../models/project");

const action = async ({ ack, payload, body, ...rest }) => {
  console.log(payload.view.state.values);

  await ack();
};

module.exports = action;
