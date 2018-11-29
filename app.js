let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let helloWorld = require("./controllers/hello-controller");
app.use(require("./middleware/headers"))
app.use(bodyParser.json());
app.use("/hello", helloWorld)
app.listen(3000, function(req, res){
    console.log("App is listening on 3000")
})