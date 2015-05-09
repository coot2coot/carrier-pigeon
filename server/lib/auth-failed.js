"use strict";

module.exports = function (req, res) {
	res.writeHead(303, {
        'Location': '/#/login/error'
    });

    res.end();
}
