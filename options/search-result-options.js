const Item = require("../models/item");

const options = async ({ ack, payload, ...rest }) => {
  const value = RegExp(payload.value, "i");

  const items = await Item.find({ name: { $regex: value } })
    .populate({ path: "product", select: "name" })
    .populate({ path: "project", select: "name" })
    .populate({ path: "role", select: "name" })
    .exec();

  const itemList = items.map((item) => {
    return {
      text: {
        type: "plain_text",
        text: truncate(
          item.name +
            "  | " +
            item.product.name +
            " / " +
            item.project.name +
            " / " +
            item.role.name
        ),
      },
      value: item._id,
    };
  });

  console.log(itemList);

  return await ack({
    options: itemList,
  });
};

const truncate = (str, length = 75) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }
  return str;
};

module.exports = options;
