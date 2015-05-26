var sauceUsername = process.env.SAUCE_USERNAME || require("../../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../../credentials.json").accesskey,
    username = process.env.TEST_USERNAME || require("../../../credentials.json").testUsername,
    password = process.env.TEST_PASSWORD || require("../../../credentials.json").testPassword;

function landingTests (wd, capability, remote) {
  	describe("When adding a contact", function() {
        var browser;

        before(function(done) {

            if (remote) {
                browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, sauceUsername, sauceAccessKey);
            } else {
                browser = wd.promiseChainRemote();
            }
            browser
                .init(capability)
                .nodeify(done);
        });

        beforeEach(function(done) {
            browser
                .get("http://localhost:8000")
                .nodeify(done);
        });

        after(function(done) {
            browser
                .quit()
                .nodeify(done);
        });

        it("Should be able to go to contacts by clicking contacts", function(done) {
            browser
                .waitForElementByCssSelector("input[name='username']")
                .sendKeys(username, function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='password']")
                .sendKeys(password, function (err) {
                    if (err) console.log(err);
                })
                .elementByTagName("form")
                .submit(function (err) {
                    if (err) console.log(err);
                })
                .waitForElementByCssSelector("nav li a[href = '#/contacts']")
                .click()
                .eval("window.location.href")
                    .should.eventually.include('contacts')

                .nodeify(done);
        });
    });
};

module.exports = landingTests;