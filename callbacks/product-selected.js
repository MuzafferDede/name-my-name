const action = require("../actions/add-new-item");
const Project = require("../models/project");

const callback = async ({ ack, body, action, client, logger, ...rest }) => {
  ack();

  const projects = await Project.find({
    product: action.selected_option.value,
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

  const blocks = body.view.blocks.map((block) => {
    if (block.block_id === "project") {
      block.element.options = projectList;
    }

    return block;
  });

  const result = await client.views.update({
    view_id: body.view.id,
    view: {
      callback_id: body.view.callback_id,
      title: body.view.title,
      submit: body.view.submit,
      blocks: blocks,
      type: body.view.type,
    },
  });

  logger.info(result);
};

module.exports = callback;
