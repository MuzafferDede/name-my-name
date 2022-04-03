const Product = require("../models/product");
const Project = require("../models/project");

const action = async ({ ack, body, action, client, ...rest }) => {
  const projectBlock = body.view.blocks.find(
    (block) => block.block_id === "project"
  );

  const projects = await Project.find({
    product: action.selected_option.value,
  });

  const projectOptions = projects.map((project) => {
    return {
      text: {
        type: "plain_text",
        text: project.name,
      },
      value: project._id,
    };
  });

  await client.views.update({
    view_id: body.view.id,
    view: {
      title: body.view.title,
      callback_id: body.view.callback_id,
      submit: body.view.submit,
      blocks: [
        {
          ...projectBlock,
          options: projectOptions,
        },
        ...body.view.blocks,
      ],
      type: body.view.type,
    },
  });
};

module.exports = action;
