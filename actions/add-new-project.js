const Product = require("../models/product");

const action = async ({ body, ack, client, logger }) => {
  await ack();

  const products = await Product.find({});

  const productList = products.map((product) => {
    return {
      text: {
        type: "plain_text",
        text: product.name,
        emoji: true,
      },
      value: product._id,
    };
  });

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "handleNewProject",
      type: "modal",
      title: {
        type: "plain_text",
        text: "Add new project",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      blocks: [
        {
          block_id: "product",
          type: "input",
          dispatch_action: true,
          element: {
            type: "static_select",
            action_id: "projectProductSelected",
            placeholder: {
              type: "plain_text",
              text: "Select a product",
            },
            options: productList,
          },
          label: {
            type: "plain_text",
            text: "Product",
          },
        },
        {
          block_id: "project",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "projectNameDefined",
            placeholder: {
              type: "plain_text",
              text: "e.g PE, PPE, etc.",
            },
          },
          label: {
            type: "plain_text",
            text: "Project Name",
          },
        },
      ],
    },
  });

  logger.info(result);
};

module.exports = action;
