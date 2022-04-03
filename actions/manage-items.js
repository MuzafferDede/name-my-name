const User = require("../models/user");

const action = async ({ body, ack, client, logger }) => {
  await ack();

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
        text: `*Product:*\n${item.product.name}`,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Delete",
        },
        action_id: "delete-item",
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
