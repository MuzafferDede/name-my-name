const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");
const projects = require("./effects/projects.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.view("view_new_item", newItem);

  app.action("product_selected", projects, () => {
    console.log("yesss");
  });
};

module.exports = controller;
