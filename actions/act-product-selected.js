const Product = require("../models/product");
const Project = require("../models/project");

const action = async ({ ack, body, action, client, ...rest }) => {
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
          block_id: "project",
          type: "input",
          dispatch_action: true,
          element: {
            type: "static_select",
            action_id: "projectSelected",
            placeholder: {
              type: "plain_text",
              text: "Select a project",
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Select a project",
                },
                value: "0",
              },
              ...projectOptions,
            ],
          },
          label: {
            type: "plain_text",
            text: "Project",
          },
        },
        ...body.view.blocks.filter((block) => block.block_id !== "project"),
      ],
      type: body.view.type,
    },
  });
};

module.exports = action;
