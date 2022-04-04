const User = require("../models/user");

const action = async ({ body, ack, client, action, logger, ...rest }) => {
  const user = await User.findOne({
    slackId: body.user.id,
  })
    .populate({
      path: "items",
      populate: [
        {
          path: "product",
          model: "Product",
        },
        {
          path: "project",
          model: "Project",
        },
        {
          path: "role",
          model: "Role",
        },
      ],
    })
    .exec();

  if (!user) {
    await ack({
      response_action: "errors",
      errors: {
        home_header: "User not found",
      },
    });
    return;
  }
  await ack();

  const blocks = user.items.map((item) => {
    return {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `*Item:* ${item.name}\n
          ${item.product.name}/${item.project.name}/${item.role.name}/${
            item.name
          }
          ${item.tag ? `/${item.tag}` : ""}`,
        },
      ],
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
