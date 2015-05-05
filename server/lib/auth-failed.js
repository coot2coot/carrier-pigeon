"use strict";

module.exports = function (req, res, message) {
	res.writeHead(303, {
        'Location': '/#/login'
    });

	!!message
	? res.end(message)
	: res.end()
}
