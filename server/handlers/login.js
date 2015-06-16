"use strict";

var JWT      	= require('jsonwebtoken');
var secret   	= process.env.JWT_SECRET || require("../../credentials.json").secret;
var Cookies  	= require('cookies');

var authFailed  = require('../lib/auth-failed.js');
var getFormData = require('../lib/get-form-data.js');
var getUser     = require('../db-config.js').selectUser;


function checkUserLogins(req, res, cb) {
    getFormData(req, function(logins) {
        getUser(logins.username, logins.password, logins.remember, cb);
    })
}

function createSession (details, callback) {
    var payload = {
        username: details.username,
        admin: details.admin,
        first_name: details.first_name,
        last_name: details.last_name,
        email: details.email
    };

    var token = JWT.sign(payload, secret);

    callback(token);
}

function loginUser (req, res) {
	checkUserLogins(req, res, function(err, user, remember) {
        if (err) {
            authFailed(req, res);
        } else {
            createSession(user, function(token) {
                var cookies = new Cookies(req, res, ['token']);

                if (remember === "on") {
                    cookies.set( "token", token, {
                        maxAge: 1000 * 60 * 60 * 24 * 31,
                        signed: true
                    });
                } else {
                    cookies.set( "token", token, {
                        signed: true
                    });
                }

                res.writeHead(303, {
                    'Location': '/#/orders'
                });

                res.end();
            })
        }
    });
}

function loginHandler (req, res) {

 	if (req.method === "POST") {
		loginUser(req, res);
	} else {
		authFailed(req, res);
	}
}

module.exports = loginHandler;