const Product = require("../models/product");

const view = async ({ ack, view, logger }) => {
  const value = view.state.values.product.productNameDefined.value;

  const product = new Product({
    name: value,
  });

  product.save((err) => {
    if(err) {
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
