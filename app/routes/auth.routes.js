const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

const bodyParser = require('express');


module.exports = function(app) {
    app.use(function(req, res, next) {
       
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept,Authorization")
  
    next();
  });
  app.use(bodyParser.json());
  app.post("/api/auth/signin", controller.signin);
};