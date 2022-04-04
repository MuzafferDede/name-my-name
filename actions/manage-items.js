const User = require("../models/user");

const action = async ({ body, ack, client, action, logger, ...rest }) => {
  console.log(rest);
  const user = await User.findOne({
    slackId: body.user.id,
  })
    .populate("items")
    .exec();

  if (!user) {
    await ack();
    return;
  }
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
