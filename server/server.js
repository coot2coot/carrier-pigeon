var http = require("http");
var config = require("./config.js");
var route = require("./route.js");

var ecstatic = require("ecstatic")({
	root: __dirname + "/public"
});

var server = http.createServer(route);


server.listen(config.port, function () {
	console.log('Server running on port:',server.address().port);
});




