var http = require("http");
var static = require('node-static');
var file = new static.Server('./public');

var Router = require("routes");
var router = new Router();

var routes = require("./server/route.js");
var Config = require("./server/config.js");


routes(router);

var server = http.createServer(function (req, res) {

	var path = req.url;
	var match = router.match(path);

    if (match) {
        match.fn(req, res, match);
    } else {
        req.addListener('end', function () {
	        file.serve(req, res);
	    }).resume();
    }
});

server.listen(Config.port, function () {
	console.log('Server running on port:',server.address().port);
});

