const Item = require("../models/item");

const options = async ({ ack, payload, ...rest }) => {
  const value = RegExp(payload.value, "i");

  const items = await Item.find({ $or: [{ name: { $regex: value } }] })
    .populate("product")
    .populate("project");

  console.log(items);
  const itemList = items.map((item) => {
    return {
      text: {
        type: "plain_text",
        text: item.name + " / " + item.product.name + " / " + item.project.name,
      },
      value: item._id,
    };
  });

  return await ack({
    options: itemList,
  });
};

module.exports = options;
