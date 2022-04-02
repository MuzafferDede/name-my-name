const view = async ({ ack, view, logger }) => {
  const result = await ack({
    response_action: "update",
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Product created",
      },
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Product:*\n${view.state.values.product.productNameDefined.value}`,
            },
          ],
        },
      ],
    },
  });

  logger.info(result);
};

module.exports = view;
