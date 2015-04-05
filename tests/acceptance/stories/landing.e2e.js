function landingTests (wd) {
  	describe("regular mocha usage", function() {
        var browser;

        before(function(done) {

            browser = wd.promiseChainRemote();
            browser.on('status', function(info) {
                console.log(info);
            });
            browser.on('command', function(meth, path, data) {
                console.log(' > ' + meth, path, data || '');
            });
             browser
                .init({
                    browserName: "firefox",
                    version: "35.0",
                    platform: "OS X 10.9"
                })
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
