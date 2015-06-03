'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/reminders.js');

var tests = function () {

	test("post function posts to reminders table", function(t) {
		var callback =  function (result){
			t.equals(result,null, "post request to reminders table worked")
		};
		try {
			db.post('reminders', mocks.reminder, callback);
		} catch(e) {
			t.notOk(true, "post request to reminders table did not work");
		}

	    t.end();
	});
}

module.exports = tests;
