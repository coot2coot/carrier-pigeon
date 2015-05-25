var test = require("tape");
var shot = require("shot");
var readUnits = require("../../../server/handlers/read-units-db.js");


test("trying to get unit information without correct cookies", function (t) {

	shot.inject(readUnits, { method: "get", url: "/units/55"}, function (res) {
		t.equal(res.statusCode, 303, "response code is correct");
		t.equal(res.headers.Location, "/#/login/error", "redirect url is correct");
		t.end();
	});	
});
