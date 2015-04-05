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
