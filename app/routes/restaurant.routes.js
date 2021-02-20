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
    "/api/new/restaurant",
    [
     authJwt.verifyToken,
    ],
    controller.createRestaurant
  );

  app.post(
    "/api/new/menu/:restId",
    [
     authJwt.verifyToken,
    ],
    controller.createMenu
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
  "/api/menu/active/:restId/:isActive",
  controller.setActiveMenu
);


};