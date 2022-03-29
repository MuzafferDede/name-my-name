const callback = async ({ ack, view, client }) => {
  await ack({
    response_action: "update",
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Foundable created",
      },
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Product:*\n${view.state.values.product.product_select_action.selected_option.text.text}`,
            },
            {
              type: "mrkdwn",
              text: `*Project:*\n${view.state.values.project.project_select_action.selected_option.text.text}`,
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
              text: `*Role:*\n${view.state.values.role.role_select_action.selected_option.text.text}`,
            },
            {
              type: "mrkdwn",
              text: `*Foundable's name:*\n${view.state.values.foundable.foundable_action.value}`,
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
              text: `*Tag:*\n${view.state.values.tag.tag_action.value}`,
            },
            {
              type: "mrkdwn",
              text: `*URL:*\n<${view.state.values.url.url_action.value}|:earth_americas: Open>`,
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
              text: `*${view.state.values.product.product_select_action.selected_option.text.text}* / *${view.state.values.project.project_select_action.selected_option.text.text}* / *${view.state.values.role.role_select_action.selected_option.text.text}* / *${view.state.values.foundable.foundable_action.value}* / *${view.state.values.tag.tag_action.value}*`,
            },
          ],
        },
      ],
    },
  });
};

module.exports = callback;
