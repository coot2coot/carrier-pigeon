"use strict"

var pdf          = require('html-pdf');
var fs           = require('fs');
var parseData    = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');
var formatJobId  = require('../../src/lib/format-job-number.js');

var api_key    = process.env.MAIL_GUN_API_KEY || require("../../credentials.json").mailGunApiKey;
var domain     = process.env.MAIL_GUN_DOMAIN || require("../../credentials.json").mailGunDomain;
var mailgun    = require('mailgun-js')({apiKey: api_key, domain: domain});

function sendBookingNote (attachment, toEmail, ccEmail, order, sender, bookingType) {
    var html, subject, filename;
    
    if (bookingType === "Request") {
      html = require('../email/booking-note.js')(order, sender);
      subject = "Booking Request";
      filename = "booking-request.pdf";
    } else {
      html = require('../email/confirmation-note.js')(order, sender);
      subject = "Booking Confirmation";
      filename = "booking-confirmation.pdf";
    }

    var attch = new mailgun.Attachment({data: attachment, filename: filename});

    var data = {
        from: 'Coot Freight Ltd <noreply@cootfreight.co.uk>',
        to: toEmail,
        subject: formatJobId(order.job_number, order.date) + ' - ' + subject + ' from Coot Freight',
        html: html,
        attachment: attch
    };

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

            pdf.create(data.attachment).toBuffer(function(err, buffer) {

                if (err) {
                    return console.log(err);
                }

                var parsedOrder = JSON.parse(data.order);

                var bookingType = req.url.split('/')[3];

                sendBookingNote(buffer, data.toemail, data.ccemail, parsedOrder, user.email, bookingType);

                res.writeHead(200);
                res.end();
            });
        });
    });
}

module.exports = emailBookingNote;
