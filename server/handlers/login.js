"use strict";

var jwt      	= require('jsonwebtoken');
var secret   	= process.env.JWT_SECRET || require("../../credentials.json").secret;
var Cookies  	= require('cookies');

var authFailed  = require('../lib/auth-failed.js');
var getFormData = require('../lib/get-form-data.js');
var getUser     = require('../db/select-user.js');

// TODO: generate a more secure one. Nelson recommends crypto
function generateGUID() {
    return new Date().getTime();
}

function generateToken(payload, GUID) {
    var token = jwt.sign({
        user: payload
    }, secret);
    return token;
}

function checkUserLogins(req, res, cb) {
    getFormData(req, function(logins) {
        getUser(logins.username, logins.password, logins.remember, cb);
    })
}

function loginUser (req, res) {
	checkUserLogins(req, res, function(err, user, remember, message) {
        if (err || message) {
            console.log(err, message);
            authFailed(req, res);
        }
        if (user) {

            var GUID    = generateGUID();
            var token   = generateToken(user, GUID);
            var cookies = new Cookies(req, res);

            if (remember === "on") {
                var current = new Date();
                cookies.set( "token", token, {
                    expires: current.setMonth(current.getMonth()+1) // expired one month from now
                });
            } else {
                cookies.set( "token", token);
            }

            res.writeHead(303, {
                'Location': '/#/orders'
            });

            res.end();
        }
    });
}

function loginHandler (req, res) {

 	if (req.method === "POST") {
		loginUser(req, res);
	} else {
		require('../lib/auth-failed.js')(req, res);
	}
}

module.exports = loginHandler;