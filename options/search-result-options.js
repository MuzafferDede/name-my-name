const Item = require("../models/item");

const options = async ({ ack, payload, ...rest }) => {
  const value = RegExp(payload.value, "i");

  const items = await Item.find()
    .populate("product")
    .populate("project")
    .or([{ name: { $regex: value } }, { "product.name": { $regex: value } }]);

  console.log(items);
  const itemList = items.map((item) => {
    return {
      text: {
        type: "plain_text",
        text: item.name,
      },
      value: item._id,
    };
  });

  return await ack({
    options: itemList,
  });
};

module.exports = options;
