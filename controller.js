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

      await client.views.update({
        view_id: body.view.id,
        view: {
          type: "modal",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "What is the name of the item?",
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
