const callback = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "create_new_product",
      title: {
        type: "plain_text",
        text: "Create new product",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      blocks: [
        {
          block_id: "product_name",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "add_product_action",
            placeholder: {
              type: "plain_text",
              text: "e.g Good Wallet, One Account, Financial Core, etc.",
            },
          },
          label: {
            type: "plain_text",
            text: "Product Name",
          },
        },
      ],
      type: "modal",
    },
  });

  logger.info(result);
};

module.exports = callback;
