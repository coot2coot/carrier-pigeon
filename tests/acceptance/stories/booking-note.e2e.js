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
                .setImplicitWaitTimeout(500)
                .elementsByTagName("td")
                .then(function(elements) {
                    elements[1]
                        .elementByTagName("a")
                        .click()
                })
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

        it('pressing the booking button works', function(done) {
            browser
                .waitForElementByLinkText("Booking Request")
                .click()    
                .waitForElementByCssSelector(".booking-note")
                .isDisplayed()
                .then(function (displayed) {
                    displayed.should.be.true;
                })
                .nodeify(done);
        });

        it('booking note has correct information', function(done) {
            browser
                .waitForElementByLinkText("Booking Request")
                .click() 
                .sleep(500)   
                .elementByCssSelector("#job-number")
                .text()
                .then(function(text) {
                    text.should.match(/(Job no: )\d{8}/)
                })
                .nodeify(done);
        });

        it('email button should bring up a popup where you can input an email', function(done) {
            browser
                .waitForElementByLinkText("Booking Request")
                .click()
                .waitForElementByLinkText("Email")
                .click()
                .elementByClassName("email", function(err, element) {
                    element
                        .elementByTagName("h3")
                        .text()
                        .then(function(text) {
                            text.should.contain.string("Enter an email")
                        })
                        .nodeify(done);
                })   
        });
    });
};

module.exports = landingTests;
