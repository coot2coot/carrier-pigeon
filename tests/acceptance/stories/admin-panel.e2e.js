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
                .sendKeys(username)
                .elementByCssSelector("input[name='password']")
                .sendKeys(password)
                .elementByTagName("form")
                .submit()
                .waitForElementByLinkText("Admin Panel")
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

        it('Page title is correct', function(done) {
            browser
                .elementByTagName('h3')
                .text()
                .then(function(text) {
                    text.should.equal("Users")
                })
                .nodeify(done);
        });

        it("url is correct", function(done) {
            browser
                .url()
                .then(function(url) {
                    url.should.contain("users");
                })
                .nodeify(done);
        });

        it("displays list of users", function(done) {
            browser
                .elementsByTagName('tr')
                .then(function(element) {
                    var length = element.length;
                    (length).should.be.greaterThan(1);
                })
                .nodeify(done);
        });

        it("Invite user works", function(done) {
            browser
                .elementByClassName('add')
                .click()
                .waitForElementByCssSelector('input[name="email"]')
                .sendKeys("test@email.com")
                .elementByTagName('form')
                .submit()
                .waitForElementsByClassName("test-username")
                .then(function(element) {
                    var length = element.length;
                    (length).should.be.greaterThan(0);
                })
                .nodeify(done);
        });

        it("Delete button opens panel", function(done) {
            browser
                .waitForElementByCssSelector("a.delete.test")
                .click()
                .elementByClassName("warning", function(err, element) {
                    element
                        .elementByTagName("h3")
                        .text()
                        .then(function(text) {
                            text.should.equal("Delete this user?");
                        })
                        .nodeify(done);
                })
                
        });

        it("Delete user works", function(done) {
            browser
                .waitForElementByCssSelector(".delete.test")
                .click()
                .elementByCssSelector("a.button.charcoal")
                .click()
                .elementByClassNameIfExists("test-username")
                .then(function(element) {
                    (element === undefined).should.be.true;
                })
                .nodeify(done);
        });
    });
};

module.exports = landingTests;
