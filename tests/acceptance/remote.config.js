var chai 			= require("chai");
var chaiAsPromised  = require("chai-as-promised");
var webdriver 		= require('wd');

var landingTests 	= require("./stories/landing.e2e.js");
var adminTests 		= require("./stories/admin-panel.e2e.js");
var ledgerTests 	= require("./stories/ledger.e2e.js");
var contactTests    = require("./stories/contacts.e2e.js");
var orderTests      = require("./stories/orders.e2e.js");

var capabilites;
 


chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = webdriver.transferPromiseness;

capabilites = [
	{
		name: "Chrome Carrier-Pigeon",
		browserName: "chrome",
		version: "41.0",
		platform: "OS X 10.9"
	},
	{
		name: "Firefox Carrier-Pigeon",
		browserName: "firefox",
		version: "35.0",
		platform: "OS X 10.9"
	},
	{
		name: "Safari Carrier-Pigeon",
		browserName: "safari",
		version: "8.0",
		platform: "OS X 10.10"
	}
];

describe('', function() {
    this.timeout(100000);
    var i,
    	length = capabilites.length;

    for (i = length - 1; i >= 0; i--) {
    	landingTests(webdriver, capabilites[i], true);
    	adminTests(webdriver, capabilites[i], true);
    	contactTests(webdriver, capabilites[i], true);
    	ledgerTests(webdriver, capabilites[i], true);
    	orderTests(webdriver, capabilites[i],true);
    };
});