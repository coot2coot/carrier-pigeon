'use strict';

var test = require('tape');
var db = require('../../server/db-config.js');
var testDb = require('../createDb.js');
var client   = "postgres://qzdwpgfrviqmcu:1hJBjZXlz_8pjTb9qjPUTHiQao@ec2-107-20-159-103.compute-1.amazonaws.com:5432/d6dar9ohioh4dh?ssl=true";


var tests = function () {
	// DB.GET

	test("get function returns the specified tables contents", function(t) {

		var results;
		var callback =  function (result){
			t.equals(result[0].job_number, 3248, "get method returned the rows from the orders table");
		};

		try {
			db.get('orders',callback, client);
		} catch(e) {
			t.notOk(true, "post request to orders table did not work");
		}

	    t.end();
	});

	// DB.POST

	test("post function posts to orders and units tables", function(t) {
		var callback =  function (result){
			t.equals(result,null, "post request to units and orders table worked")
		};
		try {
			db.post('orders', testDb.mockOrdersUnits, callback, client);
		} catch(e) {
			t.notOk(true, "post request to orders table did not work");
		}

	    t.end();
	});

	// DB.EDIT

	test("edit function to orders and units table", function(t) {
		var callback =  function (result){
			t.equals(result, null, "edit request to units and orders table worked")
		};
		try {
			db.edit("orders", testDb.mockOrdersUnits, callback, client);
		} catch(e) {
			t.notOk(true, "edit request to orders table did not work");
		}

	    t.end();
	});

	// DB.REMOVE

	test("remove function for orders and units table", function(t) {
		var callback =  function (result){
			t.equals(result, null,  "remove request to orders and units table worked")
		};
		try {
			db.remove("orders", '1234', callback, client);
		} catch(e) {
			t.notOk(true, "remove request to orders table did not work");
		}

	    t.end();
	});


	test("clear table", function(t) {
		testDb.clearTable();
		t.ok(true, "table cleared");
	    t.end();
	});
}

testDb.createOrder(tests)