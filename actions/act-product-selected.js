const Product = require("../models/product");
const Project = require("../models/project");

const action = async ({ ack, body, action, client, ...rest }) => {
  await ack();

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

  const initial = {
    text: {
      type: "plain_text",
      text: "Select a project",
    },
  };

  const blocks = body.view.blocks.map((block) => {
    if (block.block_id === "project") {
      return {
        ...block,
        element: {
          ...block.element,
          options: [initial, ...projectOptions],
          initial_option: initial,
        },
      };
    }

    return block;
  });

  const result = await client.views.update({
    view_id: body.view.id,
    view: {
      title: body.view.title,
      callback_id: body.view.callback_id,
      submit: body.view.submit,
      blocks,
      type: body.view.type,
    },
  });

  console.log(result.view.blocks);
};

module.exports = action;
