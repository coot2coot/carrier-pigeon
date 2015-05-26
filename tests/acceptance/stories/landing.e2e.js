var sauceUsername = process.env.SAUCE_USERNAME || require("../../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../../credentials.json").accesskey,
    username = process.env.TEST_USERNAME || require("../../../credentials.json").testUsername,
    password = process.env.TEST_PASSWORD || require("../../../credentials.json").testPassword;

function landingTests (wd, capability, remote) {
  	describe("When landing on the website", function() {
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

        it('if not authenticated, should redirect to login page', function(done) {
            browser
                .url(function(err, url) {
                    url.should.contain("login");
                })
                .nodeify(done);
        });

        it("should retrieve the page title", function(done) {
            browser
                .title()
                .then(function(title) {
                    title.should.equal("Coot Freight Ltd");
                })
                .nodeify(done);
        });
        it("if you enter the wrong logins, a login message appears", function(done) {
            browser
                .waitForElementByCssSelector("input[name='username']")
                .sendKeys("notausername")
                .elementByCssSelector("input[name='password']")
                .sendKeys("whoops")
                .elementByTagName("form")
                .submit()
                .elementByClassName("error", function (err, elem) {
                    elem
                        .text()
                        .then(function(text) {
                            var testText = "Sorry, those logins are not correct";
                            text.should.contain(testText);
                        })
                })
                .nodeify(done);
        });
        it("Should be able to Login", function(done) {
            browser
                .waitForElementByCssSelector("input[name='username']")
                .sendKeys(username)
                .elementByCssSelector("input[name='password']")
                .sendKeys(password)
                .elementByTagName("form")
                .submit()
                .url(function(err, url) {
                    url.should.contain("ordrs");
                })
                .nodeify(done);
        });
    });
};

module.exports = landingTests;
