const Product = require("../models/product");

const options = async ({ ack, payload, ...rest }) => {
  const products = await Product.find().or([
    { name: { $regex: new RegExp(payload.value), $options: "i" } },
    { tag: { $regex: new RegExp(payload.value), $options: "i" } },
  ]);

  const productList = products.map((product) => {
    return {
      text: {
        type: "plain_text",
        text: product.name,
      },
      value: product._id,
    };
  });

  return await ack({
    options: productList,
  });
};

module.exports = options;
