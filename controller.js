const start = require("./events/start.js");
const addNewItem = require("./actions/add-new-item.js");
const addNewProduct = require("./actions/add-new-product.js");
const addNewProject = require("./actions/add-new-project.js");
const addNewRole = require("./actions/add-new-role.js");
const handleNewItem = require("./views/handle-new-item.js");
const handleNewProduct = require("./views/handle-new-product.js");
const handleNewProject = require("./views/handle-new-project.js");
const handleNewRole = require("./views/handle-new-role.js");
const productSelected = require("./callbacks/product-selected.js");

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
  app.view("handleNewItem", handleNewItem);

  app.view("handleNewProduct", handleNewProduct);

  app.view("handleNewProject", handleNewProject);

  app.view("handleNewRole", handleNewRole);
};

module.exports = controller;
