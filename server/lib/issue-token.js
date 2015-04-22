"use strict";

var JWT      	= require('jsonwebtoken');
var secret   	= process.env.JWT_SECRET || require("../../credentials.json").secret;
var aguid       = require('aguid');
var ES          = require('esta');

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
        jti: aguid(), 
        user: details.username
    };

    var token = JWT.sign(payload, secret);

    var session = {
      type:  "session",
      id  :  payload.jti,
      person: payload.user,
      created: new Date().toISOString()
    }

    ES.CREATE(session, function(esres) {
      return callback(token, esres);
    });
}

function loginUser (req, res) {
	checkUserLogins(req, res, function(err, user, remember, message) {
        if (err || message) {
            return authFailed(req, res);
        }

        createSession(user, function(token, eres) {
            console.log("eres... "eres);
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
        })
    });
}

module.exports = loginUser;