"use strict"

var pdf          = require('html-pdf');
var fs           = require('fs');
var parseData    = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');

var api_key = 'key-c675f88a6e54632efaed14a61a431cf9';
var domain = 'sandbox7b603196f4c643979486b6cce726860a.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function sendBookingNote (attachment, email) {
    var data = {
        from: 'Coot Freight Ltd <app@cootfreight.co.uk>',
        to: email,
        subject: 'You have been invited to join the Coot Freight Inventory Management App',
        html: require('../email/invite-user.js')(userLogins)
    }
    mailgun.messages().send(data, function (err, body) {
        err
        ? console.log(err)
        : console.log(body)
    });
}

function emailBookingNote (req, res, cb) {
    validateUser(req, res, function() {
        parseData(req, function(data) {
            var options = { filename: './businesscard.pdf', format: 'A4' };
            pdf.create(data.attachment, options).toFile(function(err, hi) {
              if (err) return console.log(err);
              console.log(hi);
            });
            // sendBookingNote(data, "natalialeebaltazar@gmail.com");
        })
    });
};

module.exports = emailBookingNote;