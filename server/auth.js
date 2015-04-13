
var fs       = require('fs');
var path     = require('path');
var jwt      = require('jsonwebtoken');
var secret   = process.env.JWT_SECRET || require("../credentials").secret;
var index    = fs.readFileSync('./public/index.html');
var Cookies   = require('cookies');

//HELPER FUNCTIONS:
var authFailed  = require('./lib/auth-failed.js');
var getFormData = require('./lib/get-form-data.js');
var getUser     = require('./db/select-user.js');


function checkUserLogins(req, res, cb) {
    getFormData(req, function(logins) {
        getUser(logins.username, logins.password, logins.remember, cb);
    })
}


function checkIfUserExists(user, cb) {
    getUser(user.user_name, user.password, user.remember, cb);
}

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

function verify(token) {
    var decoded = false;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        decoded = false;
    }
    return decoded;
}

var auth = {};

auth.login = function (req, res) {

    checkUserLogins(req, res, function(err, user, remember, message) {
        if (err || message) {
            console.log(err, message);
            authFailed(req, res);
        }
        if (user) {

            var GUID   = generateGUID();
            var token  = generateToken(user, GUID);
            var cookies = new Cookies(req, res);

            if (remember === "on") {
                console.log('remembered!')
                var current = new Date();
                cookies.set( "token", token, {
                            // expired one month from now
                    expires: current.setMonth(current.getMonth()+1)
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


auth.validate = function (req, res) {

    if (req.headers.cookie) {
        var cookie = req.headers.cookie.split("=");
        var token = cookie[1];
        var decoded = verify(token);

        if(!decoded || !decoded.user) {
            authFailed(req, res);
        } else {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            var response = JSON.stringify({
                username: decoded.user.user_name
            });

            res.end(response);
        }
    } else {
        authFailed(req, res);
    }
}

auth.logout = function (req, res) {

    var cookie = req.headers.cookie.split("=");
    var token = cookie[1];
    var decoded = verify(token);

    if(!decoded || !decoded.user) {
        authFailed(req, res);
    } else {

        authFailed(req, res, token);
    }
}

module.exports = auth;
