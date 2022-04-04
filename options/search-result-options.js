const Item = require("../models/item");

const options = async ({ ack, payload, ...rest }) => {
  const items = await Item.find()
    .populate("product")
    .populate("project")
    .or([
      { name: { $regex: new RegExp(payload.value), $options: "i" } },
      {
        product: {
          name: { $regex: new RegExp(payload.value), $options: "i" },
        },
      },
      {
        project: {
          name: { $regex: new RegExp(payload.value), $options: "i" },
        },
      },
    ])
    .exec();

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
