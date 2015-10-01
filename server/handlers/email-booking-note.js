"use strict"

var pdf          = require('html-pdf');
var fs           = require('fs');
var parseData    = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');
var formatJobId  = require('../../src/lib/format-job-number.js');

var api_key     = process.env.MAIL_GUN_API_KEY || require("../../credentials.json").mailGunApiKey;
var domain      = process.env.MAIL_GUN_DOMAIN || require("../../credentials.json").mailGunDomain;
var mailgun     = require('mailgun-js')({apiKey: api_key, domain: domain});

function sendBookingNote (attachment, toEmail, ccEmail, order, sender) {

    var buf = new Buffer(attachment, 'base64');
    var attch = new mailgun.Attachment({data: buf, filename: "booking-request.pdf"});

    var data = {
        from: 'Coot Freight Ltd <noreply@cootfreight.co.uk>',
        to: toEmail,
        subject: formatJobId(order.job_number, order.date) + ' - Booking Request from Coot Freight',
        html: require('../email/booking-note.js')(order, sender),
        attachment: attch
    }

    if (ccEmail) {
        data.cc = ccEmail;
    }

    mailgun.messages().send(data, function (err, body) {
        err ? console.log(err) : console.log(body)
    });
}

function emailBookingNote (req, res, cb) {

    validateUser(req, res, function(user) {

        parseData(req, function(data) {

            var parsedOrder = JSON.parse(data.order);

            sendBookingNote(data.attachment, data.toemail, data.ccemail, parsedOrder, user.email);

            res.writeHead(200);
            res.end();

        })
    });
};

module.exports = emailBookingNote;
