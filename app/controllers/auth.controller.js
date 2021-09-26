const db = require("../models/customer.model");
const config = require("../config/auth.config");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signin = (req, res) => {
    console.log("cool",req.body.username)
    db.findByUsername(req.body.username,(err,data) =>{
        if(err){
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found customer with username or password.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Customer with id " + req.body.username
              });
            }
        
          }
    
        if(data.password_user != req.body.password){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
              });

        }
        var token = jwt.sign({ id: data.id_user }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        
          db.role(req.body.username,(err,data)=>{
              if(err){
                if (err.kind === "not_found") {
                    res.status(403).send({
                        message: "required admin role "
                    });
                } else {
                    res.send({
                        status_code: 400,
                        message:"gagal",
                        data: {
                            
                        }
                    });
                }
              }else res.status(200).send({
                    status_code: 200,
                    message:"berhasil",
                    data: {
                        id: data.id_user,
                        username: data.username,
                        email: data.email,
                        roles: data.role,
                        access_token:token
                    }
              });
          });
    });
  
};