const Product = require("../models/product");

const options = async ({ ack, payload, ...rest }) => {
  const value = new RegExp(payload.value, "i");

  const products = await Product.find({
    name: { $regex: value },
    projects: { $gt: [] },
  });

  console.log(products);

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
