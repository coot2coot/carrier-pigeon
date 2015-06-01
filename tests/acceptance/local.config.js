var chai            = require("chai");
var chaiAsPromised  = require("chai-as-promised");
var webdriver       = require('wd');

var landingTests    = require("./stories/landing.e2e.js");
var adminTests      = require("./stories/admin-panel.e2e.js");
var ledgerTests     = require("./stories/ledger.e2e.js");
var contactTests    = require("./stories/contacts.e2e.js");
var orderTests      = require("./stories/orders.e2e.js");
var bookingNoteTests= require("./stories/booking-note.e2e.js");

var capabilites;
   

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = webdriver.transferPromiseness;

capability = {
	name: "Firefox Carrier-Pigeon",
	browserName: "firefox"
};

describe('', function() {
    this.timeout(100000);

	landingTests(webdriver, capability);
    adminTests(webdriver, capability);
    contactTests(webdriver, capability);
    ledgerTests(webdriver, capability);
    orderTests(webdriver, capability);
	bookingNoteTests(webdriver, capability);
});