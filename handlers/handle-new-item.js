const Item = require("../models/item");
const User = require("../models/user");
const Product = require("../models/product");
const Project = require("../models/project");
const Role = require("../models/role");

const handler = async ({ ack, body, view, logger }) => {
  const user = await User.findOne({ slackId: body.user.id }).exec();

  const item = new Item({
    name: view.state.values.item.itemDefined.value,
    url: view.state.values.url.urlDefined.value,
    tag: view.state.values.tag.tagDefined.value,
    product: view.state.values.product.productSelected.selected_option.value,
    project: view.state.values.project.projectSelected.selected_option.value,
    role: view.state.values.role.roleSelected.selected_option.value,
    user: user._id,
  });

  await item.save(async (err, item) => {
    const product = await Product.findOne({
      _id: item.product,
    }).exec();

    const project = await Project.findOne({
      _id: item.project,
    }).exec();

    const role = await Role.findOne({
      _id: item.role,
    }).exec();

    await ack({
      response_action: "update",
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Item created",
        },
        blocks: [
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Product:*\n${product.name}`,
              },
              {
                type: "mrkdwn",
                text: `*Project:*\n${project.name}`,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Role:*\n${role.name}`,
              },
              {
                type: "mrkdwn",
                text: `*item's name:*\n${item.name}`,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Tag:*\n${item.tag}`,
              },
              {
                type: "mrkdwn",
                text: `*URL:*\n<${item.url}|:earth_americas: Open>`,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Created by:*\n<@${user.slackId}>`,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Created at:*\n${item.createdAt}`,
              },
            ],
          },
        ],
      },
    });
  });
};

module.exports = handler;
