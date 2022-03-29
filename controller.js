const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action("product_selected", () => {
    console.log("yess");
  });

  app.view("view_new_item", newItem);
};

module.exports = controller;