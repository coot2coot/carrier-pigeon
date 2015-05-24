var test = require("tape");
var shot = require("shot");
var readDb = require("../../../server/handlers/read-db.js").cached;


test("trying to verify user during get orders without correct cookies", function (t) {

	shot.inject(readDb, { method: "get", url: "/orders/get"}, function (res) {
		t.equal(res.statusCode, 303, "response code is correct");
		t.equal(res.headers.Location, "/#/login/error", "redirect url is correct");
		t.end();
	});	
});

