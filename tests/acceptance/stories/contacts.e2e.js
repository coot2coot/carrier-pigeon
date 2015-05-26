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

        it("Should be able to add a contact", function(done) {
            browser
                .get("http://localhost:8000/#/contacts")
                .waitForElementByCssSelector(".add.blue")
                .click()
                .waitForElementByCssSelector("input[name='company_name']")
                .sendKeys("fake", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='address_line']")
                .sendKeys("17 abercorn", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='city']")
                .sendKeys("london", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='country']")
                .sendKeys("uk", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='postcode']")
                .sendKeys("uk", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='telephone']")
                .sendKeys("98376491873", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='name']")
                .sendKeys("david", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='email']")
                .sendKeys("david@gaf.com", function (err) {
                    if (err) console.log(err);
                })
                .elementByTagName("form")
                .submit(function (err) {
                    if (err) console.log(err);
                })
                .url(function(err, url) {
                    if (err) {
                        return console.log(err);
                    }
                    expect(url).to.have.string("true");
                })
                .nodeify(done);
        });
    it("Should be able to delete a contact", function(done) {
            browser
                .get("http://localhost:8000/#/contacts")
                .waitForElementByCssSelector("a[data-reactid='.0.1.2.0.2.1.$1first.0']")
                .click()
                .waitForElementByCssSelector("a[data-reactid='.0.2.1.0.0']")
                .click()
                .waitForElementByCssSelector("a[data-reactid='.0.2.0.0.0.1.2']")
                .click()
                .eval("window.location.href")
                    .should.eventually.include('true')
                .nodeify(done);
        });
    });
};

module.exports = landingTests;