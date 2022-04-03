const Product = require("../models/product");
const Project = require("../models/project");

const action = async ({ ack, body, action, client, ...rest }) => {
  const projectBlock = body.view.blocks.find(
    (block) => block.block_id === "project"
  );

  const product = await Product.find({
    _id: action.selected_option.value,
  });

  console.log(product, projectBlock);

  return await ack();

  await client.views.update({
    view_id: body.view.id,
    view: {
      title: body.view.title,
      callback_id: body.view.callback_id,
      submit: body.view.submit,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "hello World",
          },
        },
        ...body.view.blocks,
      ],
      type: body.view.type,
    },
  });
};

module.exports = action;
