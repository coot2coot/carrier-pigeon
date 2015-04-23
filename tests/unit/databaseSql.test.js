var test = require('tape');
var db = require('../../server/db-config.js');
// var testDb = require('../createDb.js');
var tests = [];

// DB.GET
function beforeAndAfter(table, tests) {
	var i;
	for(i = 0; i < tests.length; tests ++){
		testDb.createTable('orders', tests[i]);
	}
}

tests[0] = function (table) {
	test("DB Config contains a `get` function", function(t) {

		t.plan(2)

	    t.equals(typeof db.get, "function", "db.get is a function");

	    t.equals(db.get.length, 2, "db.get takes for arguments");


	    t.end(function () {
	    	testDb.deleteTable(table)
	    });
	});
}
