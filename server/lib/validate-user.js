"use strict";

var authFailed  = require('./auth-failed.js');
var verify 		= require('./verify-token.js');

function validate (req, res) {

	if (req.headers.cookie) {
        var cookie = req.headers.cookie.split("=");
        var token = cookie[1];
        var decoded = verify(token);

        if(!decoded || !decoded.user) {
            authFailed(req, res);
        } else {
            cb(decoded.user);
        }
    } else {
        authFailed(req, res);
    }
}

module.exports = validate;
