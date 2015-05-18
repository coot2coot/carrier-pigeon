var sauceUsername = process.env.SAUCE_USERNAME || require("../../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../../credentials.json").accesskey,
    username = process.env.TEST_ADMIN_USERNAME || require("../../../credentials.json").testAdminUsername,
    password = process.env.TEST_ADMIN_PASSWORD || require("../../../credentials.json").testAdminPassword;

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
                .waitForElementByLinkText("Admin Panel", function (err, element) {
                    if (err) console.log(err);
                })
                .click(function(err) {
                    if (err) console.log(err);
                })
                .nodeify(done);
        });
        
        afterEach(function(done) {
            browser
                .waitForElementByLinkText("Logout", function (err, element) {
                    if (err) console.log(err);
                })
                .click(function(err) {
                    if (err) console.log(err);
                })
                .nodeify(done);
        });

        after(function(done) {
            browser
                .quit()
                .nodeify(done);
        });

        it('Page title is correct', function(done) {
            browser
                .elementByTagName('h3')
                .text(function (err, text) {
                    if (err) console.log(err);
                    expect(text).to.equal("Users")
                })
                .nodeify(done);
        });

        it("url is correct", function(done) {
            browser
                .url(function(err, url) {
                if (err) {
                    return console.log(err);
                }
                expect(url).to.have.string("users");
            })
            .nodeify(done);
        });

        it("displays list of users", function(done) {
            browser
                .elementByTagName('table')
                .isDisplayed(function (err, success) {
                    if (err) console.log(err);
                    expect(success).to.equal(true);
                })
                .nodeify(done);
        });

        it("Invite user works", function(done) {
            browser
                .elementByClassName('add')
                .click()
                .elementByCssSelector('input[name="email"]')
                .sendKeys("test@email.com", function (err) {
                    if (err) console.log(err);
                })
                .elementByTagName('form')
                .submit(function (err) {
                    if (err) console.log(err);
                })
                .waitForElementByClassName("test-username", 2000)
                .elementByClassName("test-username", function (err, element) {
                    if (err) console.log(err);
                })
                .isDisplayed(function (err, success) {
                    if (err) console.log(err);
                    expect(success).to.equal(true);
                })
                .nodeify(done);
        });

        it("Delete button opens panel", function(done) {
            browser
                .elementByCssSelector(".delete.test", function (err, element) {
                    if (err) console.log(err);
                })
                .click()
                .elementByTagName("h3")
                .text(function (err, text) {
                    if (err) console.log(err);
                    expect(text).to.equal("Delete this user?")
                })
                .nodeify(done);
        });

        it("Delete user works", function(done) {
            browser
                .elementByCssSelector(".delete.test", function (err, element) {
                    if (err) console.log(err);
                })
                .click()
                .elementByCssSelector("a.button.charcoal", function (err, element) {
                    if (err) console.log(err);
                })
                .click()
                .elementByClassNameIfExists("test-username", function (err, element) {
                    expect(err).to.not.equal(null);
                })
                .nodeify(done);
        });
    });
};

module.exports = landingTests;
