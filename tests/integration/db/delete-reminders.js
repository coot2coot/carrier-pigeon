'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/reminders.js');

var tests = function () {

	test("remove function for reminders table", function(t) {
		var callback =  function (result){
			t.equals(result, null,  "remove request to reminders table worked")
		};
		try {
			db.remove("reminders", mocks.edit.reminder_id , callback);
		} catch(e) {
			t.notOk(true, "remove request to reminders table did not work");
		}

	    t.end();
	});
}

module.exports = tests;