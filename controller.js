const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");
const addNewProduct = require("./callbacks/add-new-product.js");
const projects = require("./effects/projects.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action("add_new_product", addNewProduct);

  app.view("view_new_item", newItem);

  app.view("create_new_product", () => {
    console.log("hello world");
  });

  app.action("product_selected", projects);
};

module.exports = controller;
