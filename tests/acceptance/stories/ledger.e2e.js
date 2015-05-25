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
                .waitForElementByLinkText("ledger", function (err, element) {
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
                    expect(text).to.include("Ledger")
                })
                .nodeify(done);
        });

        it("Close view gives you are warning", function(done) {
            browser
                .elementByClassName('close')
                .click(function(er) {
                    if (err) {
                        console.log(err);
                    }
                })
                .elementByClassName("warning")
                .isDisplayed(function(err, success) {
                    if (err) {
                        console.log(err)
                    }
                    expect(success).to.equal(true);
                })
                .nodeify(done);
        });

        // it("If clicking no on close warning you are returned to invoice page", function(done) {
        //     browser
        //         .elementByClassName('close')
        //         .click(function(er) {
        //             if (err) {
        //                 console.log(err);
        //             }
        //         })
        //         .waitForElementByTagName('button')
        //         .click()
        //         .elementByClassName("warning")
        //         .isDisplayed(function(err, success) {
        //             expect(success).to.equal(false);
        //         })
        //         .nodeify(done);
        // });

        // it("If clicking yes on close warning, invoice page is closed", function(done) {
            
        // });

        // it("Can add an invoice", function(done) {
            
        // });

        // it("Can edit an invoice", function(done) {
            
        // });

        // it("Can set Currency", function(done) {
            
        // });

        // it("Can delete an invoice", function(done) {
            
        // });
    });
};

module.exports = landingTests;
