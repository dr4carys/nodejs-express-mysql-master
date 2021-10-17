const lokalist = require("../models/lokalist.model.js");
const fs = require("fs");
const exp = require("constants");

exports.findALL=(req,res)=>{
    lokalist.getALL((err,data)=>{
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving customers."
              });
        }else res.send({
            status_code: 200,
            message:"berhasil yeay",
            data:data
        })
    })
}

exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"isi semua form"
        });
    };
    const ipadress= new lokalist({
        ip_address:req.body.ip_address,
        label : req.body.label,
        id_user :req.body.id_user
    })
    lokalist.create(ipadress,(err,data)=>{
        if(err){
            res.status(500).send({
                status_code:500,
                message:
                 err.message || "Some error occurred while retrieving customers."
            })
        }else res.send({
            status_code :200,
            message:"berhasil",
        })
    })
};