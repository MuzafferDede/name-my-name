const callback = async ({ body, ack, client, logger }) => {
  await ack();

  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "view_new_item",
      title: {
        type: "plain_text",
        text: "Create a new item",
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
            type: "select",
            placeholder: {
              type: "plain_text",
              text: "Select a product",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Good Wallet",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "One Account",
                  emoji: true,
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Financal Core",
                  emoji: true,
                },
                value: "value-2",
              },
            ],
            action_id: "product_select_action",
          },
          label: {
            type: "plain_text",
            text: "Product",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "project",
          type: "input",
          element: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a project",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "PGN",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "PE",
                  emoji: true,
                },
                value: "value-1",
              },
            ],
            action_id: "project_select_action",
          },
          label: {
            type: "plain_text",
            text: "Project",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "role",
          type: "input",
          element: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a role",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "PM",
                  emoji: true,
                },
                value: "value-4",
              },
              {
                text: {
                  type: "plain_text",
                  text: "UX",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "UI",
                  emoji: true,
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Frontend",
                  emoji: true,
                },
                value: "value-2",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Backend",
                  emoji: true,
                },
                value: "value-3",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Avengers",
                  emoji: true,
                },
                value: "value-4",
              },
            ],
            action_id: "role_select_action",
          },
          label: {
            type: "plain_text",
            text: "Role",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "item",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "item_action",
            placeholder: {
              type: "plain_text",
              text: "e.g. PRD, Design Guideline, Report, etc.",
              emoji: true,
            },
          },
          label: {
            type: "plain_text",
            text: "item's name",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "tag",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "tag_action",
            placeholder: {
              type: "plain_text",
              text: "e.g. v1.0, Python, Node.js, etc.",
              emoji: true,
            },
          },
          label: {
            type: "plain_text",
            text: "Tag",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          block_id: "url",
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "url_action",
            placeholder: {
              type: "plain_text",
              text: "https://www.example.com/path/to/item",
              emoji: true,
            },
          },
          label: {
            type: "plain_text",
            text: "URL",
            emoji: true,
          },
        },
      ],
      type: "modal",
    },
  });

  logger.info(result);
};

module.exports = callback;
