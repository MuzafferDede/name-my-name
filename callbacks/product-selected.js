const effect = async ({ ack, body, client, logger }) => {
  ack();

  const projects = [
    {
      text: {
        type: "plain_text",
        text: "PGN",
      },
      value: "value-0",
    },
    {
      text: {
        type: "plain_text",
        text: "PE",
      },
      value: "value-1",
    },
  ];

  const blocks = body.view.blocks.map((block) => {
    if (block.block_id === "project") {
      block.element.options = projects;
    }

    return block;
  });

  const result = await client.views.update({
    view_id: body.view.id,
    view: {
      title: body.view.title,
      callback_id: body.view.callback_id,
      submit: body.view.submit,
      blocks: blocks,
      type: body.view.type,
    },
  });

  logger.info(result);
};

module.exports = effect;
