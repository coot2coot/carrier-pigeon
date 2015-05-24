var test = require("tape");
var shot = require("shot");
var searchOrders = require("../../../server/handlers/search.js");


test("trying to get searched orders without correct cookies", function (t) {

	shot.inject(searchOrders, { method: "get", url: "/search/orders/1505"}, function (res) {
		t.equal(res.statusCode, 303, "response code is correct");
		t.equal(res.headers.Location, "/#/login/error", "redirect url is correct");
		t.end();
	});	
});
