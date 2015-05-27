var chai            = require("chai");
var chaiAsPromised  = require("chai-as-promised");
var webdriver       = require('wd');
var landingTests    = require("./stories/landing.e2e.js");
var adminTests      = require("./stories/admin-panel.e2e.js");
var ledgerTests     = require("./stories/ledger.e2e.js");
var contactTests    = require("./stories/contacts.e2e.js");
var capabilites;
   

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = webdriver.transferPromiseness;

capabilites = [
	{
		name: "Firefox Carrier-Pigeon",
		browserName: "firefox"
	}
];

describe('', function() {
    this.timeout(100000);
    var i,
    	length = capabilites.length;

    for (i = length - 1; i >= 0; i--) {
    	landingTests(webdriver, capabilites[i]);
        adminTests(webdriver, capabilites[i]);
        contactTests(webdriver, capabilites[i]);
    	ledgerTests(webdriver, capabilites[i]);
    };
});