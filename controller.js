const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action(
    "product_selected",
    async ({ ack, action, body, client, context, logger }) => {
      ack();

      const result = await client.views.update({
        view_id: body.view.id,
        view: {
          title: body.view.title,
          callback_id: body.view.callback_id,
          submit: body.view.submit,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "hello World",
              },
            },
            ...body.view.blocks,
          ],
          type: body.view.type,
        },
      });

      logger.info(result);
    }
  );

  app.view("view_new_item", newItem);
};

module.exports = controller;
