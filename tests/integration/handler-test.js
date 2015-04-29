var test = require('tape');
var shot = require('shot');
var handler = require('../../server/handler.js');


// test('home handler redirects to login page', function (t) {

// 	shot.inject(handler.home, { method: 'get', url: '/'}, function (res) {
// 		t.equal(res.statusCode, 302, "response code is correct");
// 		t.equal(res.headers.Location, "/login", "redirect location is correct");
// 		t.end();
// 	});	
// });

// test('once on the login page', function (t) {

// 	shot.inject(handler.login, { method: 'get', url: '/login'}, function (res) {
// 		console.log(payload);
// 		t.equal(res.statusCode, 200, "response code is correct");

// 		var payload = res.payload.indexOf('Login') > -1;

// 		t.equal(payload, true, "redirect location is correct");
// 		t.end();
// 	});	
// });