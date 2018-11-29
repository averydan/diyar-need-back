let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let helloWorld = require("./controllers/hello-controller");
app.use(require("./middleware/headers"))
app.use(bodyParser.json());
app.use("/hello", helloWorld)
app.listen(porcess.env.PORT, function(req, res){
    console.log(porcess.env.PORT)
})