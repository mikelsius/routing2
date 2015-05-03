var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(require("./auth"));

app.use("/api/llibres", require("./controllers/api/llibres"));
//app.use("/api/autors", require("./controllers/api/autors"));

app.use("/api/missatges", require("./controllers/api/missatges"));
app.use("/api/sessions", require("./controllers/api/sessions"));
app.use("/api/users", require("./controllers/api/users"));

app.use("/",require("./controllers/static"));

/*app.listen(process.env.PORT, function() {
    console.log('Server listening on', process.env.PORT);
});*/

app.listen(8080, function() {
    console.log("Servidor funcionando por el puerto 8080");
});