const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/customer.model");


verifyToken = (req, res, next) => {
    console.log("TOKEEEEEEEN",req.headers["x-access-token"])
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
        status_code:403,
        message:"you need to login"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status_code:403,
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
    
  });
  return res.status(200).send({
    status_code:200,
    message: "authorized!"
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
    return res.status(200).send({
        status_code:200,
        message: "authorized!"
      });
 

};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,

};
module.exports = authJwt;