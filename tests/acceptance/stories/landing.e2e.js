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
            // browser.on('status', function(info) {
            //     console.log(info);
            // });
            // browser.on('command', function(meth, path, data) {
            //     console.log(' > ' + meth, path, data || '');
            // });
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
                console.log(url);
                expect(url).to.have.string("login");
            })
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
    });
};

module.exports = landingTests;
