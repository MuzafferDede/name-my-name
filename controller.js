const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action("product_selected", async ({ ack, action, view, client }) => {
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
                text: `*item's name:*\n${view.state.values.item.item_action.value}`,
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
                text: `*${view.state.values.product.product_select_action.selected_option.text.text}* / *${view.state.values.project.project_select_action.selected_option.text.text}* / *${view.state.values.role.role_select_action.selected_option.text.text}* / *${view.state.values.item.item_action.value}* / *${view.state.values.tag.tag_action.value}*`,
              },
            ],
          },
        ],
      },
    });
  });

  app.view("view_new_item", newItem);
};

module.exports = controller;
