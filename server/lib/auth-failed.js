var Cookies   = require('cookies');

module.exports = function (req, res, token) {
	var cookies = new Cookies(req, res);
	if (token) {
		cookies.set( "token", token, {
			overwrite: true,
            expires: new Date()
        });
		res.writeHead(303, {
			'Location': '/#/login',
	    });
	} else {
		res.writeHead(303, {
	        'Location': '/#/login'
	    });
	}
	return res.end();
}
