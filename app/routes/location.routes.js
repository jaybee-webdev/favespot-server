const controller = require("../controllers/location.controller");
const { authJwt, filter } = require("../middleware");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/nearby/Users",
    [
      filter.nearByUsers
      // authJwt.verifyToken
    ],
    controller.getNearByUsers
  );

  app.get(
    "/api/searchAddress",
    controller.searchAddress
  );

  app.get(
    "/api/currentLocation",
    controller.getCurrentLocation
  );

  // app.get(
  //   "/api/getNearBy",
  //   controller.getNearBy
  // );
};