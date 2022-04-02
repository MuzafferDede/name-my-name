const start = require("./events/start.js");
const addNewItem = require("./actions/add-new-item.js");
const addNewProduct = require("./actions/add-new-product.js");
const addNewProject = require("./actions/add-new-project.js");
const addNewRole = require("./actions/add-new-role.js");
const productSelected = require("./callbacks/product-selected.js");
const handleNewItem = require("./views/handle-new-item.js");
const handleNewProduct = require("./views/handle-new-product.js");

const controller = (app) => {
  //Events
  app.event("app_home_opened", start);

  //Actions
  app.action("addNewItem", addNewItem);

  app.action("addNewProduct", addNewProduct);

  app.action("addNewProject", addNewProject);

  app.action("addNewRole", addNewRole);

  app.action("productSelected", productSelected);

  //Modals
  app.view("addNewItem", handleNewItem);

  app.view("addNewProduct", handleNewProduct);

  app.view("addNewProject", ({ ack }) => {
    ack();
    console.log("Created Project");
  });

  app.view("addNewRole", ({ ack }) => {
    ack();
    console.log("Created Role");
  });
};

module.exports = controller;
