var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    chai = require('chai'),
    
    describe = test.describe,
    it = test.it,
    before = test.before,
    after = test.after,
    expect = chai.expect,
    driver;


function landingTests () {
	describe('When site loads', function(){
	    this.timeout(15000);

	    before(function(){
	        driver = new webdriver.Builder().
	            withCapabilities(webdriver.Capabilities.chrome()).
	            build();
	    });

	    it('if not authenticated, should redirect to login page', function() {

	        driver.get('http://localhost:8000');
	        driver.getCurrentUrl().then(function(url) {
	        	expect(url).to.have.string("login");
	        })
	    });

	    after(function(){
	        driver.quit();
	    });
	});
}


module.exports = landingTests;
