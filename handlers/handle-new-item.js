const Item = require("../models/item");
const User = require("../models/user");

const handler = async ({ ack, body, view, logger }) => {
  const item = new Item({
    name: view.state.values.item.itemDefined.value,
    url: view.state.values.item.itemUrl.value,
    tag: view.state.values.item.itemTag.value,
    product: view.state.values.item.product.selected_option.value,
    project: view.state.values.item.project.selected_option.value,
    role: view.state.values.item.role.selected_option.value,
    user: User.findOne({ slackId: body.user.id })._id,
  });

  item.save().then((item) => {
    const result = await ack({
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
                text: `*Product:*\n${item.name}`,
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
                text: `*URL:*\n<${item.rul}|:earth_americas: Open>`,
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
                text: `*Created by:*\n${item.user.name}`,
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
