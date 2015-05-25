var test = require("tape");
var shot = require("shot");
var readDb = require("../../../server/handlers/read-db.js").getOrder;


test("trying to verify user without correct cookies during get order", function (t) {

	shot.inject(readDb, { method: "get", url: "/order/get/55"}, function (res) {
		t.equal(res.statusCode, 303, "response code is correct");
		t.equal(res.headers.Location, "/#/login/error", "redirect url is correct");
		t.end();
	});	
});
