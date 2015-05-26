var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    webdriver = require('wd'),
    landingTests = require("./stories/landing.e2e.js"),
    adminTests = require("./stories/admin-panel.e2e.js"),
    contactTests = require("./stories/contacts.e2e.js"),
    capabilites;
   

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
    };
});