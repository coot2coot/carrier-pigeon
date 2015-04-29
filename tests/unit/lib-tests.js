var test = require('tape');
var stringify = require('../../server/lib/stringify-data-sql.js');
var editQuery = require('../../server/lib/edit-query-sql.js');
var mockObject = require('../createDb.js').mockObject;


// STRINGIFY MODULE

test('the stringify module must take an object and return an object', function (t) {
	var obj = stringify(mockObject)

	t.equals( typeof obj, 'object', "stringify module returns an object");
	t.equals( Object.keys(obj).length, 2, "the object returned has two properties");
	t.end();

});


// EDIT QUERY MODULE

test('the edit query module must take an object and return a string', function (t) {
	var str = editQuery(mockObject)

	t.equals( typeof str, 'string', "edit query module returns a string");
	t.end();

});