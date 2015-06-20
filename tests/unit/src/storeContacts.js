var test = require('tape');
var storeContacts = require('../../../src/lib/storeContacts.js');


test('testing that storeContacts.refresh rverses the value of storeContacts.updated', function (t) {
	storeContacts.refresh()
	t.equals( storeContacts.updated, false, "storeContacts.refresh works");
	t.end();
});

// test('testing that storeContacts.get takes and executes a callback', function (t) {
// 	var test = true;
// 	function cb () {
// 		test = false
// 	}
// 	storeContacts.get()
// 	t.equals( test, false, "storeContacts.get returns a callback");
// 	t.end();
// });