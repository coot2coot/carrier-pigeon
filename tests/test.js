var test = require('tape');
var shot = require('shot');
var handler = require('../server/handler.js');


test('home handler test', function (t) {
	t.plan(1);

	var homeHandler = handler.home;

	shot.inject(homeHandler, { method: 'get', url: '/'}, function (res) {
		t.equal(res.statusCode, 200, "response code is ok");
		t.end();
	});	
});

