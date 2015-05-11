"use strict";

var authFailed  = require('../lib/auth-failed.js');
var verify 		= require('../lib/verify-token.js');
var Cookies  	= require('cookies');

function logout (req, res) {

	var cookies = new Cookies(req, res, ['token']);
	var token 	= cookies.get('token', {
		signed: true
	})
    var decoded = verify(token);

    cookies.set( "token", token, {
        overwrite: true,
        expires: new Date(),
        signed: true
    });
    
    res.writeHead(303, {
        'Location': '/#/login'
    });

    res.end();
}

module.exports = logout;