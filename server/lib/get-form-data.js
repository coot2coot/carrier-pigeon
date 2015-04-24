var qs = require('querystring');

module.exports = function (req, cb) {
    var body = "";

    req.on('data', function (data) {
    	console.log('data',data);
        body += data;
    });
    req.on('end', function () {
        var info = qs.parse(body);

        cb(info);
    });
}
