var sauceUsername = process.env.SAUCE_USERNAME || require("../../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../../credentials.json").accesskey,
    username = process.env.TEST_USERNAME || require("../../../credentials.json").testAdminUsername,
    password = process.env.TEST_PASSWORD || require("../../../credentials.json").testAdminPassword;


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
                .waitForElementByCssSelector('button[data-tooltip="Get last 90 days of orders"]')
                .click()
                .setImplicitWaitTimeout(2000)
                .elementsByTagName("tr")
                .then(function (elements) {
                    elements[1]
                        .elementByTagName("svg")
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

        it("Close view gives you are warning", function(done) {
            browser
                .waitForElementByCssSelector('input[type="number"]')
                .sendKeys("1234")
                .elementByCssSelector('a.close')
                .click()
                .elementByClassName("warning", function (err, element) {
                    element
                        .isDisplayed()
                        .then(function (display) {
                            display.should.be.true;
                        })
                        .nodeify(done);
                })          
        });

        it("If clicking no on close warning you are returned to invoice page", function(done) {
            browser
                .waitForElementByCssSelector('input[type="number"]')
                .sendKeys("1234")
                .elementByClassName('close')
                .click()
                .elementByLinkText("NO")
                .click()
                .elementByClassNameIfExists("warning")
                .then(function(element){
                    (element === undefined).should.be.true;
                })
                .nodeify(done);
                
        });

        it("Can add an invoice", function(done) {
            var noOfInvoices;

            browser
                .waitForElementByCssSelector("input[name='amount']", 2000)
                .elementByClassName("sales", function(err, element) {
                    element
                        .elementsByCssSelector("input[name='amount']")
                        .then(function(elements) {
                            var index = elements.length -1
                            noOfInvoices = elements.length;
    
                            elements[index]
                                .sendKeys("1000.68")
                        })
                        .elementsByCssSelector("input[name='invoice_number']")
                        .then(function(elements) {
                            var index = elements.length-1
                            elements[index]
                                .sendKeys("567")
                        })
                        .elementByTagName("form")
                        .submit()
                        .setImplicitWaitTimeout(2000)
                            .elementsByTagName("tr")
                            .then(function (elements) {
                                elements[1]
                                    .elementByTagName("svg")
                                    .click()
                            })
                        .waitForElementsByCssSelector("input[name='amount']", 2000)
                        .then(function (elements) {
                            var length = elements.length;

                            ( noOfInvoices + 1 ).should.equal(length);
                        })
                        .nodeify(done);
                })
        });

        it("Can edit an invoice", function(done) {
            browser
                .waitForElementsByCssSelector("input[name='amount']", function (err, elements) {
                    var index = elements.length -1;
                    elements[index]
                        .clear()
                        .sendKeys("10.50")
                        .elementByTagName("form")
                        .submit()
                        .setImplicitWaitTimeout(2000)
                            .elementsByTagName("tr")
                            .then(function (elements) {
                                elements[1]
                                    .elementByTagName("svg")
                                    .click()
                                    .waitForElementsByCssSelector("input[name='amount']", function(err, elements) {
                                        var index = elements.length -1;

                                        elements[index]
                                            .getValue()
                                            .then(function (value) {
                                                (value).should.equal("10.50");
                                            })
                                            .nodeify(done);
                                    })
                            })
                })
        });


        it("Can delete an invoice", function(done) {
            var noOfInvoices;

            browser
                .waitForElementsByCssSelector("input[name='amount']", 2000)
                .then(function (elements) {

                    noOfInvoices = elements.length;
                })
                .elementByClassName("sales", function (err, element) {

                    element
                        .elementsByClassName("add-row", function(err, elements) {
                            elements[1]
                                .click()
                        })
                        .elementByTagName("form")
                        .submit()
                        .elementsByTagName("tr")
                            .then(function (elements) {

                                elements[1]
                                    .elementByTagName("svg")
                                    .click()
                                    .waitForElementsByCssSelector("input[name='amount']", 2000)
                                    .then(function(elements) {
                                        var length = elements.length;

                                        ( noOfInvoices).should.equal(length);
                                    })
                                    .nodeify(done);
                            })
                })
        });
    });
};

module.exports = landingTests;
