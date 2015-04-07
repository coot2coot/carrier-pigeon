require('colors');
var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    webdriver = require('wd'),
    landingTests = require("./stories/landing.e2e.js"),
    capabilites;
   

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = webdriver.transferPromiseness;

capabilites = [
	{
		name: "Chrome Carrier-Pigeon",
		browserName: "chrome"
	},
	{
		name: "Firefox Carrier-Pigeon",
		browserName: "firefox"
	},
	{
		name: "Safari Carrier-Pigeon",
		browserName: "safari"
	}
];

describe('', function() {
    this.timeout(100000);
    var i,
    	length = capabilites.length;

    for (i = length - 1; i >= 0; i--) {
    	landingTests(webdriver, capabilites[i]);
    };
});