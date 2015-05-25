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
                if (err) {
                    return console.log(err);
                }
                expect(url).to.have.string("login");
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
                .sendKeys("notausername", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='password']")
                .sendKeys("whoops", function (err) {
                    if (err) console.log(err);
                })
                .elementByTagName("form")
                .submit(function (err) {
                    if (err) console.log(err);
                })
                .elementsByClassName("error", function (err, elem) {
                    if (err) {
                        return console.log(err);
                    } 
                    var text = elem[0].innerText;
                    var testText = "Sorry, those logins are not correct";
                    
                    expect(text).to.include(testText);
                })
                .nodeify(done);
        });
        it("Should be able to Login", function(done) {
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
                .url(function(err, url) {
                    if (err) {
                        return console.log(err);
                    }
                    expect(url).to.have.string("ordrs");
                })
                .nodeify(done);
        });
    });
};

module.exports = landingTests;
