'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function (st) {

	st.test("post function posts to orders and units tables", function(sst) {
		var callback =  function (result){
			sst.equals(result,null, "post request to units and orders table worked")
		};
		try {
			db.post('orders', mocks.order, callback);
		} catch(e) {
			sst.notOk(true, "post request to orders table did not work");
		}

	    sst.end();
	});
}

module.exports = tests;
