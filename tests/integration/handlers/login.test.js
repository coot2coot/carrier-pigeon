var test = require("tape");
var shot = require("shot");
var home = require("../../../server/handlers/home.js");
var login = require("../../../server/handlers/login.js");


test("home handler redirects to login page", function (t) {

	shot.inject(home, { method: "get", url: "/"}, function (res) {
		t.equal(res.statusCode, 200, "response code is correct");
		t.end();
	});	
});

test("Trying to login with a get", function (t) {

	shot.inject(login, { method: "get", url: "/login"}, function (res) {
		t.equal(res.statusCode, 303, "response code is correct");
		t.equal(res.headers.Location, "/#/login/error", "redirect location is correct");

		t.end();
	});	
});

test("Trying to login without correct cookies", function (t) {

	shot.inject(login, { method: "post", url: "/login"}, function (res) {
		t.equal(res.statusCode, 303, "response code is correct");
		t.equal(res.headers.Location, "/#/login/error", "redirect location is correct");

		t.end();
	});	
});
