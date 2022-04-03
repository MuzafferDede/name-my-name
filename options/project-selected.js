const Project = require("../models/project");

const callback = async ({ ack, payload, ...rest }) => {
  console.log({ ack, payload, rest });
  const projects = await Project.find({
    name: { $regex: payload.value, $options: "i" },
  });

  const projectList = projects.map((project) => {
    return {
      text: {
        type: "plain_text",
        text: project.name,
      },
      value: project._id,
    };
  });
  await ack({
    options: projectList,
  });
};

module.exports = callback;
