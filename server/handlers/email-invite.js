"use strict"

var parseData       = require('../lib/get-form-data.js');
var validateUser    = require('../lib/validate-user.js');
var db              = require("../db-config.js");

var api_key = 'key-c675f88a6e54632efaed14a61a431cf9';
var domain = 'sandbox7b603196f4c643979486b6cce726860a.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function generateLogins (mail) {
    var name = mail.split("@").shift()

    var newUser = {
        username: name,
        password: "changeme",
        email: mail,
        admin: false
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

function updateDb (userLogins) {
    userLogins.invitation = false;
    db.edit('users', userLogins, function (err) {
        if (err) {
            console.log(err)
            res.writeHead(500);
            res.write(err);
            res.end();
        } else {
            cb(req, res);
            res.writeHead(303, {
                "Location": "/#/orders/update"
            });
            res.end();
        }
    });
}

function update (req, res, cb) {
    parseData(req, function (data) {
        validateUser(req, res, function() {
            var logins = generateLogins(data.email);
            updateDb(logins);
            sendInvite(logins);
        });
    });
};

module.exports = update;