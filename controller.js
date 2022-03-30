const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action(
    "product_selected",
    async ({ ack, action, body, client, context }) => {
      console.log({ ack, action, body, client, context });

      ack();

      await client.views.push({
        trigger_id: body.trigger_id,
        view: {
          ...body.view,
          title: {
            type: "plain_text",
            text: "Hello world",
          },
        },
      });
    }
  );

  app.view("view_new_item", newItem);
};

module.exports = controller;
