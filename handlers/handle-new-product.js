const Product = require("../models/product");
const User = require("../models/user");

const view = async ({ ack, view, logger }) => {
  const value = view.state.values.product.productNameDefined.value;

  const user = await User.findOne({
    query: { slackId: view.user.id },
    update: { $setOnInsert: { slackId: view.user.id } },
    new: true,
    upsert: true,
  });

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

    logger.info(result);
  });
};

module.exports = view;
