var Static  = require('node-static');
var file 	= new Static.Server('./public');

function home (req, res) {
	
	req.addListener('end', function () {
        file.serve(req, res);
    }).resume();
}

module.exports = home;