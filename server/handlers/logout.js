"use strict";

var authFailed  = require('../lib/auth-failed.js');
var verify 		= require('../lib/verify-token.js');

function logout (req, res) {

	var cookie = req.headers.cookie.split("=");
    var token = cookie[1];
    var decoded = verify(token);

    if(!decoded || !decoded.user) {
        authFailed(req, res);
    } else {

        authFailed(req, res, token);
    }
  
}

module.exports = logout;