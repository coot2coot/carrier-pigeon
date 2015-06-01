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
                .waitForElementByCssSelector("input[name='username']")
                .sendKeys(username)
                .elementByCssSelector("input[name='password']")
                .sendKeys(password)
                .elementByTagName("form")
                .submit()
                .nodeify(done);
        });

         afterEach(function(done) {
            browser
                .waitForElementByLinkText("Logout")
                .click()
                .nodeify(done);
        });

        after(function(done) {
            browser
                .quit()
                .nodeify(done);
        });

        it("Should be able to add an order", function(done) {
            browser
                .waitForElementByCssSelector(".add.blue")
                .click()
                .elementByCssSelector("input[name='client']")
                .sendKeys("jim")
                .elementByCssSelector("input[name='carrier']")
                .waitForElementByCssSelector("input[name='unit_number']")
                .sendKeys("98376491873")
                .elementByCssSelector("input[name='unit_type']")
                .sendKeys("45dc")
                .elementByCssSelector("input[name='unit_loading_reference']")
                .sendKeys("new")
                .elementByTagName("form")
                .submit()
                .url(function(err, url) {
                    expect(url).to.contain("true");
                })
                .nodeify(done);
        });
        it("Should be able to Edit a order", function(done) {
            browser
                .setImplicitWaitTimeout(2000)
                .elementsByTagName("td")
                .then(function(elements) {
                    elements[1]
                        .elementByTagName("a")
                        .click()
                        .setImplicitWaitTimeout(8000)
                        .elementByLinkText("Edit")
                        .click()
                        .waitForElementByCssSelector("input[name='client']")
                        .sendKeys("jimbo")
                        .elementByTagName("form")
                        .submit()
                        .url(function(err, url) {
                            expect(url).to.contain("true");
                        })
                        .nodeify(done);
                })
        });

        it("Should be able to delete a order", function(done) {
            browser
                .setImplicitWaitTimeout(2000)
                .elementsByTagName("td")
                .then(function(elements) {
                    elements[1]
                        .elementByTagName("a")
                        .click()
                        .elementByLinkText("Delete")
                        .click()
                        .elementByClassName("warning", function (err, element) {
                            element
                                .elementByLinkText("Delete")
                                .click()
                                .url(function(err, url) {
                                    url.should.contain("true");
                                })
                                .nodeify(done);
                        })
                })
        });
    });
};

module.exports = landingTests;
