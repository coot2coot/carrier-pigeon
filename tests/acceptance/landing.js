var landingTests = {};


landingTests.first = function (browser) {
	browser
		.url("http://localhost:8000")
		.assert.title("Coot Freight")
		.end();
}




module.exports = landingTests;