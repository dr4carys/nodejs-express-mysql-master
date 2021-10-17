const sql = require("./db.js");

const lokalist = function(customer) {
    console.log("hehehe",customer)
    console.log("cool")
    this.ip_address = customer.ip_address;
    this.label = customer.label;
    this.id_user = customer.id_user;
    this.gambar = customer.gambar
  };

lokalist.getALL = result =>{
    sql.query("SELECT * FROM data_ip",
    (err,res) =>{
        if(err){
            result(null,err);
            return
        }
        result(null,res);

    });
};

lokalist.create = (newIp,result)=>{
    sql.query("insert into data_ip SET ?", newIp,(err,res)=>{
        if(err){
            result(err,null);
            return;
        };
        result(null, {ip:res.ip_adress, ...newIp});
    });
 };


module.exports = lokalist;
// Customer.getAll = result => {
//     sql.query("SELECT * FROM data_ip dat, users us ,role rol WHERE dat.`id_user`= us.`id_user` AND rol.`id_role`= us.`role`", 
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       console.log("customers: ", res);
//       result(null, res);
//     });
//   };