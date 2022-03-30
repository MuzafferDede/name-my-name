const start = require("./callbacks/start.js");
const addNewItem = require("./callbacks/add-new-item.js");
const newItem = require("./callbacks/view-new-item.js");
const addNewProduct = require("./callbacks/add-new-product.js");
const addNewProject = require("./callbacks/add-new-project.js");
const addNewRole = require("./callbacks/add-new-role.js");
const projects = require("./effects/projects.js");

const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_item", addNewItem);

  app.action("add_new_product", addNewProduct);

  app.action("add_new_project", addNewProject);

  app.action("add_new_role", addNewRole);

  app.action("product_selected", projects);

  app.view("view_new_item", newItem);

  app.view("create_new_product", ({ ack }) => {
    ack();
    console.log("Created Product");
  });

  app.view("create_new_project", ({ ack }) => {
    ack();
    console.log("Created Project");
  });

  app.view("create_new_role", ({ ack }) => {
    ack();
    console.log("Created Role");
  });
};

module.exports = controller;
