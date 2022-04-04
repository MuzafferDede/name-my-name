const Product = require("../models/product");
const User = require("../models/user");

const handler = async ({ ack, say, view, client, body, logger }) => {
  const value = view.state.values.product.productNameDefined.value;

  const user = await User.findOneAndUpdate(
    { slackId: body.user.id },
    { slackId: body.user.id },
    { new: true, upsert: true }
  );

  const product = new Product({
    name: value,
    user: user._id,
  });

  product.save(async (err) => {
    if (err) {
      await ack("Error saving product");
      return;
    }

    const result = await ack({
      response_action: "update",
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Product created",
        },
        blocks: [
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Product:*\n${product.name}`,
              },
            ],
          },
        ],
      },
    });

    await client.chat.postMessage({
      channel: "general",
      text: `New product: ${product.name} by <@${user.slackId}>`,
    });
  });
};

module.exports = handler;
