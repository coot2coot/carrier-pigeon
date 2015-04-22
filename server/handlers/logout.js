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

    if(!decoded || !decoded.user) {
        authFailed(req, res);
    } else {

        authFailed(req, res, token);
    }
  
}

module.exports = logout;