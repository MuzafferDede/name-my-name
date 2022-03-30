const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action("product_selected", ({ ack, action, view, client }) => {
    ack({
      response_action: "update",
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Hello there",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "What do you want to add?",
            },
          },
        ],
      },
    });
    console.log("handle product selection");
  });

  app.view("view_new_item", newItem);
};

module.exports = controller;
