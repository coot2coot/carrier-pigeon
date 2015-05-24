'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function () {

	test("get function gets orders", function(t) {
		var callback =  function (result){
			t.equals(typeof result,'object', "get request to orders table worked")
		};
		try {
			db.get('orders', callback);
		} catch(e) {
			t.notOk(true, "get request to orders table did not work");
		}

	    t.end();
	});
}

module.exports = tests;
