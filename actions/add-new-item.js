const Role = require("../models/role");

const action = async ({ body, ack, client, logger }) => {
  await ack();

  const roles = await Role.find();

  let roleList = roles.map((role) => {
    return {
      text: {
        type: "plain_text",
        text: role.name,
      },
      value: role._id,
    };
  });

  if (!roleList.length) {
    roleList = [
      {
        text: {
          type: "plain_text",
          text: "No roles found",
        },
        value: "",
      },
    ];
  }

  console.log(roleList);
  const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      callback_id: "handleNewItem",
      type: "modal",
      title: {
        type: "plain_text",
        text: "Add new item",
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
            type: "external_select",
            action_id: "productSelected",
            min_query_length: 0,
            placeholder: {
              type: "plain_text",
              text: "Select a product",
            },
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
            action_id: "projectSelected",
            placeholder: {
              type: "plain_text",
              text: "Select a project",
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Select a project",
                },
              },
            ],
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
            action_id: "roleSelected",
            placeholder: {
              type: "plain_text",
              text: "Select a role",
            },
            options: roleList,
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
            action_id: "itemDefined",
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
          optional: true,
          element: {
            type: "plain_text_input",
            action_id: "tagDefined",
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
            action_id: "urlDefined",
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
    },
  });
};

module.exports = action;
