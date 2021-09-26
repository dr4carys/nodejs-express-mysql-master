const { authJwt } = require("../middleware");
const customers = require("../controllers/customer.controller.js");
var cors= require('cors')

module.exports = app => {
  app.use(function(req, res, next) {
       
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept,Authorization")
  
    next();
  });
 
  app.post("/customers", customers.create);

  app.get("/customers", [authJwt.verifyToken,authJwt.isAdmin],customers.findAll);
  // app.get("/ambildata/:userId",user.findOne);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/customers", customers.deleteAll);
  
  app.post("/admin/signin",customers.signIn);
};
