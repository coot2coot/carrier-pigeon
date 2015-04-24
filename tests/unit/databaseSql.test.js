var test = require('tape');
var db = require('../../server/db-config.js');
var testDb = require('../createDb.js');
var client   = "postgres://qzdwpgfrviqmcu:1hJBjZXlz_8pjTb9qjPUTHiQao@ec2-107-20-159-103.compute-1.amazonaws.com:5432/d6dar9ohioh4dh?ssl=true";


tests = function (table) {
	// DB.GET
	test("DB Config contains a `get` function", function(t) {

	    t.equals(typeof db.get, "function", "db.get is a function");

	    t.equals(db.get.length, 3, "db.get takes 3 arguments");

	    t.end();
	});
	test("get function returns the specified tables contents", function(t) {

		var results;
		var callback =  function (result){
			t.equals(result[0].job_number, 123, "get method returned the rows from the orders table");
			testDb.clearTable(table);
		};

		db.get(table,callback, client);

	    t.end();
	});


	test("DB Config contains a `post` function", function(t) {

	    t.equals(typeof db.post, "function", "db.post is a function");

	    t.equals(db.post.length, 3, "db.post takes 3 arguments");

	    t.end();
	});
	test("get function returns the specified tables contents", function(t) {
		var callback =  function (){
			t.equals("post to orders table worked");
			testDb.clearTable(table);
		};

		db.post(table,callback, client);

	    t.end();
	});
}


testDb.createTable('testOrders', tests);
