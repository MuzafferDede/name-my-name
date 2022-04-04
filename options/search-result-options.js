const Item = require("../models/item");

const options = async ({ ack, payload, ...rest }) => {
  const value = RegExp(payload.value, "i");

  const items = await Item.find({ name: { $regex: value } })
    .populate("product")
    .populate("project")
    .populate("role");

  const itemList = items.map((item) => {
    return {
      text: {
        type: "plain_text",
        text:
          item.product.name +
          " - " +
          item.project.name +
          " - " +
          item.role.name +
          " / " +
          item.name,
      },
      value: item._id,
    };
  });

  return await ack({
    options: itemList,
  });
};

module.exports = options;
