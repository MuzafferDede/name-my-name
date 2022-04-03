const Product = require("../models/product");

const callback = async (all) => {
  const { ack, body, payload, state, ...rest } = all;
  if (payload.type === "block_suggestion") {
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
    return await ack({
      options: productList,
    });
  }

  await ack({
    state: {
      test: "yes",
    },
  });
  console.log(all.body.view.state.values);
};

module.exports = callback;
