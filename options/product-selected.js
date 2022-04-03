const Product = require("../models/product");

const callback = async ({ ack, value, ...rest }) => {
  const products = await Product.find({
    name: { $regex: value },
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
