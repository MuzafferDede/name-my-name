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
          dispatch_action: true,
          element: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select a product",
            },
            dispatch_action_config: {
              trigger_actions_on: ["on_character_entered"],
            },
            action_id: "product_selected",
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Good Wallet",
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "One Account",
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Financal Core",
                },
                value: "value-2",
              },
            ],
            action_id: "product_select_action",
          },
          label: {
            type: "plain_text",
            text: "Product",
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
            },
            options: [
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
            ],
            action_id: "project_select_action",
          },
          label: {
            type: "plain_text",
            text: "Project",
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
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "PM",
                },
                value: "value-4",
              },
              {
                text: {
                  type: "plain_text",
                  text: "UX",
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "UI",
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Frontend",
                },
                value: "value-2",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Backend",
                },
                value: "value-3",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Avengers",
                },
                value: "value-4",
              },
            ],
            action_id: "role_select_action",
          },
          label: {
            type: "plain_text",
            text: "Role",
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
            },
          },
          label: {
            type: "plain_text",
            text: "item's name",
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
            },
          },
          label: {
            type: "plain_text",
            text: "Tag",
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
            },
          },
          label: {
            type: "plain_text",
            text: "URL",
          },
        },
      ],
      type: "modal",
    },
  });

  logger.info(result);
};

module.exports = callback;
