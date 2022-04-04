const User = require("../models/user");
const Item = require("../models/item");

const action = async ({ body, ack, client, action, logger, ...rest }) => {
  await Item.findOneAndRemove({ _id: action.value });

  const user = await User.findOne({ slackId: body.user.id });

  user.items = user.items.filter(
    (item) => item._id.toString() !== action.value
  );

  await user.save();

  await ack();

  const blocks = user.items.map((item) => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Item:*\n${item.name}`,
      },
      accessory: {
        action_id: "deleteItem",
        type: "button",
        text: {
          type: "plain_text",
          text: "Delete",
        },
        value: item._id,
        confirm: {
          title: {
            type: "plain_text",
            text: "Are you sure?",
          },
          text: {
            type: "plain_text",
            text: "This will delete the item from your list.",
          },
          style: "danger",
        },
      },
    };
  });

  const items = blocks.length
    ? blocks.reduce((acc, block, index) => {
        return [...acc, { type: "divider" }, block];
      }, [])
    : [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "You have no items.",
          },
        },
      ];

  await client.views.update({
    view_id: body.view.id,
    view: {
      title: body.view.title,
      callback_id: body.view.callback_id,
      blocks: items,
      type: body.view.type,
    },
  });
};

module.exports = action;
