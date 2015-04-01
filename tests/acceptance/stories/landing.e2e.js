var landingTests = {};

landingTests.before = function (browser) {
	browser.url("http://localhost:8000")
}

landingTests["title is correct"] = function (browser) {
	browser
		.assert.title("Coot Freight ltd")
		.end();
}

landingTests["You are correctly redirected to the login page"] = function (browser) {
	browser.assert.urlContains('login');
}

landingTests["Header has correct company name"] = function (browser) {
}

landingTests["There is a login panel with two inputs"] = function (browser) {
	
}

landingTests["When you enter a username and password, "] = function (browser) {
	
}

module.exports = landingTests;