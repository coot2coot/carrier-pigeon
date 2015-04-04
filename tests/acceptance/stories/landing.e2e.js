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
	describe('My Website', function(){
	    this.timeout(15000);

	    before(function(){
	        driver = new webdriver.Builder().
	            withCapabilities(webdriver.Capabilities.chrome()).
	            build();
	    });

	    it('should work', function() {

	        driver.get('http://localhost:8000');

	        
	    });

	    after(function(){
	        driver.quit();
	    });
	});
}


module.exports = landingTests;