var sauceUsername = process.env.SAUCE_USERNAME || require("../../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../../credentials.json").accesskey;

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
                .elementByCssSelector("input[name='username']")
                .sendKeys("facAdmin", function (err) {
                    if (err) console.log(err);
                })
                .elementByCssSelector("input[name='password']")
                // TODO: keep in cred + env variable travis
                .sendKeys("code", function (err) {
                    if (err) console.log(err);
                })
                .elementByTagName("form")
                .submit(function (err) {
                    if (err) console.log(err);
                })
                .elementByLinkTextOrNull("Admin Panel", function (err, element) {
                    if (err) console.log(err);
                    console.log(element);
                })
                .click(function(err) {
                    if (err) console.log(err);
                })
                .url(function(err, url) {
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
        // it("displays list of users", function(done) {
        //     browser
        //         .findElement(by.name('h2'))
        //         .innerText().then(function (err, text) {
        //             if (err) {
        //                 console.log(err);
        //             }
        //             console.log("TEXT >>> ", text);
        //             expect(text).to.equal("Users")
        //         })
        //         .nodeify(done);
        // });

        // it("Invite user works", function(done) {
        //     browser
        //         .findElement(by.name('input[type="submit"]')) //class 'add'
        //         .click()
        //         .findElement(by.name('input[type="text"]')) //Input box
        //         .nodeify(done);
        // });

        // it("Delete User works", function(done) {
        //     browser
        //         .findElement(by.name('h2'))
        //         .innerText().then(function (err, text) {
        //             if (err) {
        //                 console.log(err);
        //             }
        //             console.log("TEXT >>> ", text);
        //             expect(text).to.equal("Users")
        //         })
        //         .nodeify(done);
        // });
    });
};

module.exports = landingTests;
