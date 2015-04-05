var sauceUsername = process.env.SAUCE_USERNAME || require("../../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../../credentials.json").accesskey;

function landingTests (wd) {
  	describe("regular mocha usage", function() {
        var browser;

        before(function(done) {

            browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, sauceUsername, sauceAccessKey);
            browser.on('status', function(info) {
                console.log(info);
            });
            browser.on('command', function(meth, path, data) {
                console.log(' > ' + meth, path, data || '');
            });
             browser
             .init({browserName:'firefox'})
                // .init({
                //     browserName: "chrome"
                // })
                .nodeify(done);  //same as : .then(function() { done(); });
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

        it("should retrieve the page title", function(done) {
            browser
                .title()
                .then(function(title) {
                    title.should.equal("Coot Freight");
                })
                .nodeify(done);
        });

        it('if not authenticated, should redirect to login page', function(done) {
            browser
                .url(function(err, url) {
                if (err) {
                    return console.log(err);
                }
                console.log(url);
                expect(url).to.have.string("login");
            })
            .nodeify(done);
        });
    });
};

module.exports = landingTests;
