var landingTests = {};

landingTests.beforeEach = function (browser) {
	browser.url("http://localhost:8000");
}

landingTests["title is correct"] = function (browser) {
	browser
		.assert.title("Coot Freight");
}

landingTests["You are correctly redirected to the login page"] = function (browser) {
	browser
		.assert.urlContains('login');
}

landingTests["Header has correct company name"] = function (browser) {
	browser
		.assert.containsText("h1", "Coot Freight");
}

// landingTests["When you enter a username and password, "] = function (browser) {
// 	browser
// 		.waitForElementVisible('input[type=submit]', 5000)
// 		.setValue("input[name='username']", "username")
// 		.setValue("input[name='password']", "password")
// 		.click('input[type=submit]')  
// 		.waitForElementVisible('main.container', 5000)
// 		.assert.urlContains('orders')
// 		.end();
// }

module.exports = landingTests;