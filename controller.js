//events
const start = require("./events/app-home-opened.js");

// actions
const addNewItem = require("./actions/add-new-item.js");
const addNewProduct = require("./actions/add-new-product.js");
const addNewProject = require("./actions/add-new-project.js");
const addNewRole = require("./actions/add-new-role.js");
const manageItems = require("./actions/manage-items.js");
const actProductSelected = require("./actions/act-product-selected.js");
const searchItems = require("./actions/search-items.js");
const searchResult = require("./actions/search-result.js");

// handlers
const handleNewItem = require("./handlers/handle-new-item.js");
const handleNewProduct = require("./handlers/handle-new-product.js");
const handleNewProject = require("./handlers/handle-new-project.js");
const handleNewRole = require("./handlers/handle-new-role.js");

// options
const productOptions = require("./options/product-options.js");
const searchResultOptions = require("./options/search-result-options.js");

const controller = (app) => {
  //Events
  app.event("app_home_opened", start);

  //Actions
  app.action("addNewItem", addNewItem);
  app.action("addNewProduct", addNewProduct);
  app.action("addNewProject", addNewProject);
  app.action("addNewRole", addNewRole);
  app.action("productSelected", actProductSelected);
  app.action("manageItems", manageItems);
  app.action("deleteItem", manageItems);
  app.action("searchItems", searchItems);
  app.action("searchResult", searchResult);

  //Modals
  app.view("handleNewItem", handleNewItem);
  app.view("handleNewProduct", handleNewProduct);
  app.view("handleNewProject", handleNewProject);
  app.view("handleNewRole", handleNewRole);

  //Options
  app.options("productSelected", productOptions);
  app.options("searchResult", searchResultOptions);
};

module.exports = controller;
