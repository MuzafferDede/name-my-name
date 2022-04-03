const User = require("../models/user");

const action = async ({ body, ack, client, logger, ...rest }) => {
  await ack();

  console.log(body, rest);

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
