const callback = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "handleNewProduct",
      type: "modal",
      title: {
        type: "plain_text",
        text: "Add new product",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      blocks: [
        {
          block_id: "product",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "productNameDefined",
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
    },
  });

  logger.info(result);
};

module.exports = callback;
