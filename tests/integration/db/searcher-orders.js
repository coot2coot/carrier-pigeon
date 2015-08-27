'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function (st) {

	st.test("searcher method gets all units for a specific job_number", function(sst) {
		var getJobNumber = function () {
		    var today = new Date();
		  
			var id = ("0000" + mocks.edit.singleValueObject.job_number).slice(-4);
		    var mm = ("0" + (today.getMonth()+1)).slice(-2);
		    var yy = today.getFullYear().toString().slice(-2);

		    return yy + mm + id;
		}
		var callback =  function (n,result){
			sst.equals(typeof result,'object', "search request to orders worked")
		};
		try {
			db.searcher('orders',getJobNumber(), callback);
		} catch(e) {
			sst.notOk(true, "search request to orders table did not work");
		}

	    sst.end();
	});

	st.test("searcher method gets all orders which contain a key word", function(sst) {

		var callback =  function (n,result){
			sst.equals(typeof result,'object', "search request for key word in orders worked")
		};
		try {
			db.searcher('orders','jeff', callback);
		} catch(e) {
			sst.notOk(true, "search request for key word in orders did not work");
		}

	    sst.end();
	}); 

	st.test("searcher method gets all units for a keyword and returns the orders", function(sst) {

		var callback =  function (n,result){
			sst.equals(typeof result,'object', "search request for key word in units worked")
		};
		try {
			db.searcher('orders','40dd', callback);
		} catch(e) {
			sst.notOk(true, "search request for key word in units did not work");
		}

	    sst.end();
	});
}

module.exports = tests;