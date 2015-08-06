'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function (st) {

	return 	st.test("edit function to contacts", function(sst) {
				var callback =  function (result){
					sst.equals(result, null, "edit request to contacts table worked")
				};
				try {   
					db.edit("contacts", mocks.edit, callback);
				} catch(e) {
					sst.notOk(true, "edit request to contacts table did not work");
				}
			    sst.end();
			});

}

module.exports = tests;