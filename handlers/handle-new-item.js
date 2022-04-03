const Item = require("../models/item");
const User = require("../models/user");

const handler = async ({ ack, body, view, logger }) => {
  const user = await User.findOne({ slackId: body.user.id }).exec();
  console.log(user);
  const item = new Item({
    name: view.state.values.item.itemDefined.value,
    url: view.state.values.url.urlDefined.value,
    tag: view.state.values.tag.tagDefined.value,
    product: view.state.values.product.productSelected.selected_option.value,
    project: view.state.values.project.projectSelected.selected_option.value,
    role: view.state.values.role.roleSelected.selected_option.value,
    user: user._id,
  });

  item.save().then(async (item) => {
    console.log(item);
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
                text: `*Product:*\n${item.product.name}`,
              },
              {
                type: "mrkdwn",
                text: `*Project:*\n${item.project.name}`,
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
                text: `*Role:*\n${item.role.name}`,
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
                text: `*Created by:*\n<@${item.user.slackId}>`,
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
