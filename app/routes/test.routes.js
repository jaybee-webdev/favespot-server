const { verifySignUp, authJwt, filter } = require("../middleware");
const uploadFile = require("../middleware/upload");

const controller = require("../controllers/test.controller");

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
    "/test/signup",
    [
      verifySignUp.testDuplicateMobileOrEmail,
    ],
    controller.signup
  );

  app.post(
    "/test/new/restaurant",
    controller.createRestaurant
  );

  app.post(
    "/test/new/menu/:restId",
    controller.createMenu
  );


 //GET
 
app.get(
  "/test/users",
  controller.getAllUsers
); 


};