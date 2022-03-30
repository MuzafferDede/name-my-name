const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action(
    "product_selected",
    async ({ ack, action, body, view, client, context }) => {
      await client.views.push({
        trigger_id: body.trigger_id,
        view: {
          callback_id: "view_new_item",
          title: {
            type: "plain_text",
            text: "Hello world",
          },
          blocks: [
            {
              type: "input",
              block_id: "product",
              label: {
                type: "plain_text",
                text: "Product",
              },
              element: {
                type: "plain_text_input",
                action_id: "product_selected",
              },
            },
          ],
        },
      });
    }
  );

  app.view("view_new_item", newItem);
};

module.exports = controller;
