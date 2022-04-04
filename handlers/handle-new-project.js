const Project = require("../models/project");
const Product = require("../models/product");
const User = require("../models/user");

const handler = async ({ ack, view, body, logger }) => {
  const projectProductSelected =
    view.state.values.product.productSelected.selected_option.value;

  const value = view.state.values.project.projectNameDefined.value;

  const product = await Product.findOne({ _id: projectProductSelected });

  const user = await User.findOneAndUpdate(
    { slackId: body.user.id },
    { slackId: body.user.id },
    { new: true, upsert: true }
  );

  const project = new Project({
    name: value,
    product: product,
    user: user._id,
  });

  project.save(async (err) => {
    if (err) {
      await ack("Error saving project");
      return;
    }

    product.projects.push(project);

    product.save();

    await ack({
      response_action: "update",
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Project created",
        },
        blocks: [
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Project:*\n${project.name}`,
              },
            ],
          },
        ],
      },
    });

    await client.chat.postMessage({
      channel: "general",
      text: `${user.slackId} created a new project: *${project.name}*`,
    });
  });
};

module.exports = handler;
