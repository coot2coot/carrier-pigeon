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

	test("post function", function(t) {
		var callback =  function (result){
			t.equlas(result,null, "post request to units and orders table worked")
		};
		try {
			db.post('orders', testDb.mockOrdersUnits, callback, client);
		} catch(e) {
			t.notOk(false, "post request to orders table did not work");
		}

	    t.end();
	});

	// // DB.REMOVE

	// test("remove function works", function(t) {
	// 	var callback =  function (){
	// 		t.ok(true, "remove request to orders table worked")
	// 	};
	// 	try {
	// 		db.remove(table, '$1234', callback, client);
	// 	} catch(e) {
	// 		t.notOk(false, "remove request to orders table did not work");
	// 	}

	//     t.end();
	// });

	// DB.EDIT

	// test("edit function works", function(t) {
	// 	var callback =  function (){
	// 		t.ok(true, "edit request to orders table worked")
	// 	};
	// 	try {
	// 		db.edit(table, testDb.mockObject2, callback, client);
	// 	} catch(e) {
	// 		t.notOk(false, "edit request to orders table did not work");
	// 	}

	//     t.end();
	// });

	test("clear table", function(t) {
		testDb.clearTable();
		t.ok(true, "table cleared");
	    t.end();
	});
}

testDb.createOrder(tests)