'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function () {


	test("searcher method gets all units for a specific job_number", function(t) {
		var getJobNumber = function () {
		    var today = new Date();
		  
			var id = ("0000" + mocks.ordersUnitsEdit.order.job_number).slice(-4);
		    var mm = ("0" + (today.getMonth()+1)).slice(-2);
		    var yy = today.getFullYear().toString().slice(-2);
		  	console.log(yy + mm + id)
		    return yy + mm + id;
		}
		var callback =  function (n,result){
			t.equals(typeof result,'object', "search request to orders worked")
		};
		try {
			db.searcher('orders',getJobNumber(), callback);
		} catch(e) {
			t.notOk(true, "search request to orders table did not work");
		}

	    t.end();
	});

	test("searcher method gets all orders which contain a key word", function(t) {

		var callback =  function (n,result){
			t.equals(typeof result,'object', "search request for key word in orders worked")
		};
		try {
			db.searcher('orders','jeff', callback);
		} catch(e) {
			t.notOk(true, "search request for key word in orders did not work");
		}

	    t.end();
	});
	test("searcher method gets all units for a keyword and returns the orders", function(t) {

		var callback =  function (n,result){
			t.equals(typeof result,'object', "search request for key word in units worked")
		};
		try {
			db.searcher('orders','40dd', callback);
		} catch(e) {
			t.notOk(true, "search request for key word in units did not work");
		}

	    t.end();
	});
}

module.exports = tests;