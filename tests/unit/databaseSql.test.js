'use strict';

var test = require('tape');
var db = require('../../server/db-config.js');
var testDb = require('../createDb.js');
var client   = "postgres://qzdwpgfrviqmcu:1hJBjZXlz_8pjTb9qjPUTHiQao@ec2-107-20-159-103.compute-1.amazonaws.com:5432/d6dar9ohioh4dh?ssl=true";


var tests = function (table) {
	// DB.GET
	test("DB Config contains a `get` function", function(t) {

	    t.equals(typeof db.get, "function", "db.get is a function");

	    t.equals(db.get.length, 3, "db.get takes 3 arguments");

	    t.end();
	});

	test("get function returns the specified tables contents", function(t) {

		var results;
		var callback =  function (result){
			t.equals(result[0].job_number, '$12567', "get method returned the rows from the orders table");
		};

		try {
			db.get(table,callback, client);
		} catch(e) {
			t.notOk(false, "post request to orders table did not work");
			testDb.clearTable(table);
		}

	    t.end();
	});

	// DB.POST
	test("DB Config contains a `post` function", function(t) {

	    t.equals(typeof db.post, "function", "db.post is a function");

	    t.equals(db.post.length, 4, "db.post takes 4 arguments");

	    t.end();
	});

	test("post function works", function(t) {
		var callback =  function (){
			t.ok(true, "post request to orders table worked")
		};
		try {
			db.post(table, testDb.fakeOrder, callback, client);
		} catch(e) {
			t.notOk(false, "post request to orders table did not work");
		}

	    t.end();
	});

	// DB.REMOVE
	test("DB Config contains a `remove` function", function(t) {

	    t.equals(typeof db.remove, "function", "db.remove is a function");

	    t.equals(db.remove.length, 4, "db.remove takes 4 arguments");

	    t.end();
	});

	test("remove function works", function(t) {
		var callback =  function (){
			t.ok(true, "remove request to orders table worked")
		};
		try {
			db.remove(table, '$1234', callback, client);
		} catch(e) {
			t.notOk(false, "remove request to orders table did not work");
		}

	    t.end();
	});

	// DB.EDIT
	test("DB Config contains a `edit` function", function(t) {

	    t.equals(typeof db.edit, "function", "db.edit is a function");

	    t.equals(db.edit.length, 4, "db.edit takes 4 arguments");

	    t.end();
	});

	test("edit function works", function(t) {
		var callback =  function (){
			t.ok(true, "edit request to orders table worked")
		};
		try {
			db.edit(table, testDb.fakeOrder2, callback, client);
		} catch(e) {
			t.notOk(false, "edit request to orders table did not work");
		}

	    t.end();
	});

	test("clear table", function(t) {
		testDb.clearTable(table);
		t.ok(true, "table cleared");
	    t.end();
	});
}


testDb.createOrder('testOrders', tests);
