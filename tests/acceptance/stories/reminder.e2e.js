var sauceUsername = process.env.SAUCE_USERNAME || require("../../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../../credentials.json").accesskey,
    username = process.env.TEST_USERNAME || require("../../../credentials.json").testUsername,
    password = process.env.TEST_PASSWORD || require("../../../credentials.json").testPassword;

function landingTests (wd, capability, remote) {

  	describe("When adding a reminder", function() {
        var browser, Asserter, loads;

        before(function(done) {
            Asserter = wd.Asserter;

            loads = new Asserter(
                function(el) {
                    console.log(el.length, el.length > 2);
                    return el.length > 2;
                }
            );

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
                .waitForElementByLinkText("Reminders")
                .click()
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

        it("Should be able to go to reminders by clicking contacts", function(done) {
            browser
                .url(function(err, url) {
                    url.should.contain('contacts');
                })
                .nodeify(done);
        });

        it("Should be able to add a reminder", function(done) {
            browser
                .waitForElementByCssSelector(".add.blue")
                .click()
                .waitForElementByCssSelector("input[name='contact']")
                .sendKeys("fake")
                .elementByCssSelector("input[name='date']")
                .sendKeys("05-05-2015")
                .elementByTagName("form")
                .submit()
                .url(function(err, url) {
                    expect(url).to.contain("true");
                })
                .nodeify(done);
        });

        it("Should be able to delete a reminder", function(done) {
            browser
                .setImplicitWaitTimeout(2000)
                .elementsByTagName("td")
                .then(function(elements) {
                    elements[2]
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