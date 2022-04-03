const start = require("./events/app-home-opened.js");
const addNewItem = require("./actions/add-new-item.js");
const addNewProduct = require("./actions/add-new-product.js");
const addNewProject = require("./actions/add-new-project.js");
const addNewRole = require("./actions/add-new-role.js");
const handleNewItem = require("./handlers/handle-new-item.js");
const handleNewProduct = require("./handlers/handle-new-product.js");
const handleNewProject = require("./handlers/handle-new-project.js");
const handleNewRole = require("./handlers/handle-new-role.js");
const productSelected = require("./callbacks/product-selected.js");
const projects = require("./options/projects.js");

const controller = (app) => {
  //Events
  app.event("app_home_opened", start);

  //Actions
  app.action("addNewItem", addNewItem);

  app.action("addNewProduct", addNewProduct);

  app.action("addNewProject", addNewProject);

  app.action("addNewRole", addNewRole);

  //Modals
  app.view("handleNewItem", handleNewItem);

  app.view("handleNewProduct", handleNewProduct);

  app.view("handleNewProject", handleNewProject);

  app.view("handleNewRole", handleNewRole);

  //Callbacks
  app.action("productSelected", projects);

  app.action("projectSelected", projects);
};

module.exports = controller;
