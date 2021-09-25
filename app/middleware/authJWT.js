const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/customer.model");


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
    db.role(req.body.username,(err,data) =>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(403).send({
                    message: "required admin role "
                });
            } else {
                res.status(500).send({
                    message: "Error "
                });
            }
        }else{
            next();
            return;
        }

    });
 

};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,

};
module.exports = authJwt;