const { authJwt } = require("../middleware");
const controller = require("../controllers/restaurant.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


//POST
  app.post(
    "/api/restaurant",
    [
     authJwt.verifyToken,
    ],
    controller.createRestaurant
  );

  app.post(
    "/api/menu/:restId",
    [
     authJwt.verifyToken,
    ],
    controller.createMenu
  );

  app.post(
    "/api/category",
    [
     authJwt.verifyToken,
    ],
    controller.createCategory
  );


//GET
app.get(
  "/api/restaurant/:restId",
  controller.getRestaurant
);

app.get(
  "/api/restaurants",
  controller.getRestaurants
);

app.get(
  "/api/nearby/restaurants",
  controller.getNearbyRestaurants
);

app.get(
  "/api/menu/:restId",

  controller.getMenu
);

app.get(
  "/api/menu-status/:menuId/:status",
  [
    authJwt.verifyToken,
  ],
  controller.setActiveMenu
);

app.get(
  "/api/restaurant/:restId/:status",
  [
    authJwt.verifyToken,
  ],
  controller.setRestaurantStatus
);

app.get(
  "/api/categories",
  [
    authJwt.verifyToken,
  ],
  controller.getCategory
);


};