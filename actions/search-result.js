const Item = require("../models/item");

const action = async ({ ack, body, action, client, logger }) => {
  await Item.findOne({ _id: action.selected_option.value })
    .populate({ path: "product", select: "name" })
    .populate({ path: "project", select: "name" })
    .populate({ path: "role", select: "name" })
    .populate({ path: "user", select: "slackId" })
    .exec(async (err, newItem) => {
      await client.views.push({
        trigger_id: body.trigger_id,
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
                  text: `*Product:*\n${newItem.product.name}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Project:*\n${newItem.project.name}`,
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
                  text: `*Role:*\n${newItem.role.name}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Item's name:*\n${newItem.name}`,
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
                  text: `*Tag:*\n${newItem.tag}`,
                },
                {
                  type: "mrkdwn",
                  text: `*URL:*\n<${newItem.url}|:earth_americas: Open>`,
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
                  text: `*Created by:*\n<@${newItem.user.slackId}>`,
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
                  text: `*Created at:*\n${newItem.createdAt}`,
                },
              ],
            },
          ],
        },
      });
    });
};

module.exports = action;
