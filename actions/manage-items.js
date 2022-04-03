const User = require("../models/user");
const Item = require("../models/item");

const action = async ({ body, ack, client, action, logger, ...rest }) => {
  if (action.action_id === "deleteItem") {
    await Item.findOneAndRemove({ _id: action.value });

    const user = await User.findOne({ slackId: body.user.id });

    user.items = user.items.filter(
      (item) => item._id.toString() !== action.value
    );

    await user.save();
  }

  const user = await User.findOne({
    slackId: body.user.id,
  })
    .populate("items")
    .exec();

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
        if (index % 2 === 0) {
          return [...acc, { type: "divider" }, block];
        }

        return [...acc, block];
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

  await ack();

  if (action.action_id === "deleteItem") {
    await client.views.update({
      view_id: body.view.id,
      view: {
        title: body.view.title,
        callback_id: body.view.callback_id,
        blocks: items,
        type: body.view.type,
      },
    });
    return;
  }

  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "handleManageItems",
      type: "modal",
      title: {
        type: "plain_text",
        text: "Your items",
      },
      blocks: items,
    },
  });
};

module.exports = action;
