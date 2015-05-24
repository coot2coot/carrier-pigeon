var test = require("tape");
var shot = require("shot");
var searchDates = require("../../../server/handlers/search-dates.js");


test("trying to get searched orders by date without correct cookies", function (t) {

	shot.inject(searchDates, { method: "get", url: "/search/dates/2015-05-01-2015-05-01"}, function (res) {
		t.equal(res.statusCode, 303, "response code is correct");
		t.equal(res.headers.Location, "/#/login/error", "redirect url is correct");
		t.end();
	});	
});
