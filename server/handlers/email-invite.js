"use strict"

var parseData       = require('../lib/get-form-data.js');
var validateUser    = require('../lib/validate-user.js');
var db              = require("../db-config.js");

var api_key = process.env.MAIL_GUN_API_KEY || requre("../../credentials.json").mainGunApiKey;
var domain = process.env.MAIL_GUN_DOMAIN || requre("../../credentials.json").mainGunDomain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function generateLogins (mail) {
    var name = mail.split("@").shift().capitalize();

    var newUser = {
        username: name,
        email: mail,
        admin: false,
        invitation: false
    }
    return newUser;
}

function sendInvite (userLogins) {
    var data = {
        from: 'Coot Freight Ltd <app@cootfreight.co.uk>',
        to: userLogins.email,
        subject: 'You have been invited to join the Coot Freight Inventory Management App',
        html: require('../email/invite-user.js')(userLogins)
    }
    mailgun.messages().send(data, function (err, body) {
        err
        ? console.log(err)
        : console.log(body)
    });
}

function updateDb (userLogins, cb) {
    db.post('users', userLogins, function (err) {
        if (err) {
            cb(err)
        } else {
            cb(null, true);
        }
    });
}

function update (req, res, cb) {
    parseData(req, function (data) {
        validateUser(req, res, function() {
            var logins = generateLogins(data.email);

            updateDb(logins, function(err, success) {
                if (err) {
                    res.writeHead(303, {
                        "Location": "/#/users/show/error"
                    });
                    return res.end();
                }

                sendInvite(logins);
                res.writeHead(303, {
                    "Location": "/#/users/true"
                });
                res.end();
            });
        });
    });
};

module.exports = update;