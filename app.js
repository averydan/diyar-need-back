require('dotenv').config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let bodyParser = require("body-parser");
let helloWorld = require("./controllers/hello-controller");
let User = require("./controllers/user-controller")
let Email = require("./controllers/email-controller")
let Project = require("./controllers/project-controller")
let Supply = require("./controllers/supplies-controller")
sequelize.sync()
app.use(require("./middleware/headers"))
app.use(bodyParser.json());
app.use("/hello", helloWorld)
app.use("/user", User)
app.use("/email", Email)
app.use(require("./middleware/validate-session"))
app.use("/projects", Project)
app.use("/supplies", Supply)
app.listen(process.env.PORT, function(req, res){
    console.log(process.env.PORT)
})