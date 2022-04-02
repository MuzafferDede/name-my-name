const callback = async ({ ack, view, logger }) => {
  const result = await ack({
    response_action: "update",
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Item created",
      },
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Product:*\n${view.state.values.product.productSelected.selected_option.text.text}`,
            },
            {
              type: "mrkdwn",
              text: `*Project:*\n${view.state.values.project.projectSelected.selected_option.text.text}`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Role:*\n${view.state.values.role.roleSelected.selected_option.text.text}`,
            },
            {
              type: "mrkdwn",
              text: `*item's name:*\n${view.state.values.item.itemDefined.value}`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Tag:*\n${view.state.values.tag.tagDefined.value}`,
            },
            {
              type: "mrkdwn",
              text: `*URL:*\n<${view.state.values.url.urlDefined.value}|:earth_americas: Open>`,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*${view.state.values.product.productSelected.selected_option.text.text}* / *${view.state.values.project.projectSelected.selected_option.text.text}* / *${view.state.values.role.roleSelected.selected_option.text.text}* / *${view.state.values.item.item_action.value}* / *${view.state.values.tag.tag_action.value}*`,
            },
          ],
        },
      ],
    },
  });

  logger.info(result);
};

module.exports = callback;
