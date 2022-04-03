const Project = require("../models/project");

const action = async ({ ack, payload, body, ...rest }) => {
  console.log(rest, payload.view.state.values);
  // console.log(b);
  // const projects = await Project.find({
  //   name: { $regex: payload.value, $options: "i" },
  // });
  // const projectList = projects.map((project) => {
  //   return {
  //     text: {
  //       type: "plain_text",
  //       text: project.name,
  //     },
  //     value: project._id,
  //   };
  // });
  // await ack({
  //   options: projectList,
  // });
};

module.exports = action;
