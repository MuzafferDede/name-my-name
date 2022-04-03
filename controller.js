//events
const start = require("./events/app-home-opened.js");

// actions
const addNewItem = require("./actions/add-new-item.js");
const addNewProduct = require("./actions/add-new-product.js");
const addNewProject = require("./actions/add-new-project.js");
const addNewRole = require("./actions/add-new-role.js");
const projectSelected = require("./actions/project-selected.js");

// handlers
const handleNewItem = require("./handlers/handle-new-item.js");
const handleNewProduct = require("./handlers/handle-new-product.js");
const handleNewProject = require("./handlers/handle-new-project.js");
const handleNewRole = require("./handlers/handle-new-role.js");

// options
const productSelected = require("./options/product-selected.js");

const controller = (app) => {
  //Events
  app.event("app_home_opened", start);

  //Actions
  app.action("addNewItem", addNewItem);

  app.action("addNewProduct", addNewProduct);

  app.action("addNewProject", addNewProject);

  app.action("addNewRole", addNewRole);

  app.action("projectSelected", projectSelected);

  //Modals
  app.view("handleNewItem", handleNewItem);

  app.view("handleNewProduct", handleNewProduct);

  app.view("handleNewProject", handleNewProject);

  app.view("handleNewRole", handleNewRole);

  //Options
  app.options("productSelected", productSelected);
};

module.exports = controller;
