// var MochaSauce = require("mocha-sauce");
// var sauceUsername = process.env.SAUCE_USERNAME || require("../../credentials.json").username,
//     sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../credentials.json").accesskey;


// // configure
// var sauce = new MochaSauce({
//     name: "project", // your project name
//     username: sauceUsername, // Sauce username
//     accessKey: sauceAccessKey, // Sauce access key
//     host: "localhost", // or http://ondemand.sauce.com if not using Sauce Connect
//     port: 4445, // 80

//     // the test url
//     url: "http://localhost/test" // point to the site running your mocha tests
// });


// // setup what browsers to test with
// sauce.browser({ browserName: "chrome", platform: "Windows 7" });
// sauce.browser({ browserName: "firefox", platform: "Windows XP" });


// sauce.on('init', function(browser) {
//   console.log('  init : %s %s', browser.browserName, browser.platform);
// });

// sauce.on('start', function(browser) {
//   console.log('  start : %s %s', browser.browserName, browser.platform);
// });

// sauce.on('end', function(browser, res) {
//   console.log('  end : %s %s : %d failures', browser.browserName, browser.platform, res.failures);
// });

// sauce.start();


require('colors');
var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    wd = require('wd'),

    landingTests = require("./stories/landing.e2e.js");
    
chai.use(chaiAsPromised);
chai.should();

chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe('mocha spec examples', function() {
    this.timeout(100000);

    landingTests(wd);
});