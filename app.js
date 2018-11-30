require('dotenv').config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let bodyParser = require("body-parser");
let helloWorld = require("./controllers/hello-controller");
let User = require("./controllers/user-controller")
sequelize.sync()
app.use(require("./middleware/headers"))
app.use(bodyParser.json());
app.use("/hello", helloWorld)
app.use("/user", User)
app.listen(process.env.PORT, function(req, res){
    console.log(process.env.PORT)
})