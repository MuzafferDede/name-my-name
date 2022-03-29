const controller = (app) => {
  app.event("app_home_opened", start);

  app.action("add_new_foundable", addNewFoundable);

  app.view("create_new_product_action", createNewProduct);
};

module.exports = controller;
