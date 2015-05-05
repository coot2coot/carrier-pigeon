"use strict";

var authFailed  = require('./auth-failed.js');
var verify 		= require('./verify-token.js');
var Cookies     = require('cookies');

function validate (req, res, cb) {

	if (req.headers.cookie) {
        var cookies = new Cookies(req, res, ['token']);
        var token   = cookies.get('token', {
            signed: true
        })

        var decoded = verify(token);

        console.log(decoded);

        if(!decoded || !decoded.user) {
            authFailed(req, res, 'Sorry, you must login before you can proceed');
        } else {
            cb(decoded.user);
            console.log(decoded.user);
        }
    } else {
        authFailed(req, res, 'Sorry, you must login before you can proceed');
    }
}

module.exports = validate;
