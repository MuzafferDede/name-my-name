const Product = require("../models/product");

const callback = async ({ ack, body, action, client, logger, ...rest }) => {
  const products = await Product.find({
    projects: { $gt: [] },
  });

  const productList = products.map((product) => {
    return {
      text: {
        type: "plain_text",
        text: product.name,
      },
      value: product._id,
    };
  });
  await ack({
    options: productList,
  });
};

module.exports = callback;
