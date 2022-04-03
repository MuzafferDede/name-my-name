const User = require("../models/user");
const Item = require("../models/item");

const action = async ({ body, ack, client, action, logger, ...rest }) => {
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

  let payload = {
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
  };

  if (action.action_id === "deleteItem") {
    await Item.findOneAndRemove({ _id: action.value });

    const user = await User.findOne({ slackId: body.user.id });

    user.items = user.items.filter(
      (item) => item._id.toString() !== action.value
    );

    await user.save();

    payload = {
      response_action: "update",
      ...payload.view,
    };

    return await ack(payload);
  }

  ack();
  const result = await client.views.open(payload);
};

module.exports = action;
