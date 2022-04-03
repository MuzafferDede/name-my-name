const Product = require("../models/product");

const callback = async (all) => {
  const { ack, payload, state, ...rest } = all;

  console.log(all);
  await ack();
  return;
  const products = await Product.find({
    name: { $regex: payload.value, $options: "i" },
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
