const Item = require("../models/item");
const User = require("../models/user");

const handler = async ({ ack, body, view, logger }) => {
  const state = view.state.values;

  const user = await User.findOneAndUpdate(
    { slackId: body.user.id },
    { slackId: body.user.id },
    { new: true, upsert: true }
  );

  const item = new Item({
    name: state.item.itemDefined.value,
    url: state.url.urlDefined.value,
    tag: state.tag.tagDefined.value,
    product: state.product.productSelected.selected_option.value,
    project: state.project.projectSelected.selected_option.value,
    role: state.role.roleSelected.selected_option.value,
    user: user._id,
  });

  await item.save((err, newItem) => {
    user.items.push(newItem._id);
    user.save();
  });

  await Item.findOne({ _id: item._id })
    .populate({ path: "product", select: "name" })
    .populate({ path: "project", select: "name" })
    .populate({ path: "role", select: "name" })
    .populate({ path: "user", select: "slackId" })
    .exec(async (err, savedItem) => {
      console.log(savedItem);
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
                  text: `*Product:*\n${savedItem.product.name}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Project:*\n${savedItem.project.name}`,
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
                  text: `*Role:*\n${savedItem.role.name}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Item's name:*\n${savedItem.name}`,
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
                  text: `*Tag:*\n${savedItem.tag}`,
                },
                {
                  type: "mrkdwn",
                  text: `*URL:*\n<${savedItem.url}|:earth_americas: Open>`,
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
                  text: `*Created by:*\n<@${savedItem.user.slackId}>`,
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
                  text: `*Created at:*\n${savedItem.createdAt}`,
                },
              ],
            },
          ],
        },
      });
    });
};

module.exports = handler;
