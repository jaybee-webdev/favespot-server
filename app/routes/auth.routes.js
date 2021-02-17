const { verifySignUp, authJwt, filter } = require("../middleware");
const uploadFile = require("../middleware/upload");

const controller = require("../controllers/auth.controller");

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
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateMobileOrEmail,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post('/api/upload/file', 
  uploadFile.single("file"),
  controller.UploadDp);
  


//GET
app.get("/api/auth",
[authJwt.verifyToken],
controller.getUserData);







};