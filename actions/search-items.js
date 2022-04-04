const action = async ({ body, ack, client, action, logger, ...rest }) => {
  await ack();

  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "handleSearchItem",
      type: "modal",
      title: {
        type: "plain_text",
        text: "Search items",
      },
      blocks: [
        {
          type: "input",
          block_id: "search",
          dispatch_action: true,
          element: {
            type: "external_select",
            action_id: "searchResultOptions",
            placeholder: {
              type: "plain_text",
              text: "Search for an item",
            },
          },
          label: {
            type: "plain_text",
            text: "Search",
          },
        },
      ],
    },
  });
};

module.exports = action;
