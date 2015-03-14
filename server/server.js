var http = require("http");
var Config = require("./config.js");
var director = require('director');
var router = new director.http.Router();

var routes = require("./route.js");

var ecstatic = require("ecstatic")({
	root: __dirname + "/public"
});

var server = http.createServer(function (req, res) {
	router.dispatch(req, res, function (err) {
		if (err) {
			res.writeHead(404);
			res.end();
		}
	})
});

routes(router);


server.listen(Config.port, function () {
	console.log('Server running on port:',server.address().port);
});




