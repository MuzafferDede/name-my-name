const User = require("../models/user");

const action = async ({ body, ack, client, action, logger, ...rest }) => {
  await ack();

  if (action.action_id === "deleteItem") {
    const itemId = action.value;

    const user = await User.findOne({ slackId: body.user.id });

    user.items.pull({ _id: itemId });

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
      },
    };
  });

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "handleManageItems",
      type: "modal",
      title: {
        type: "plain_text",
        text: "Your items",
      },
      blocks,
    },
  });
};

module.exports = action;
