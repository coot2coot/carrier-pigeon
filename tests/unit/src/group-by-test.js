var test    = require('tape');
var groupBy = require('../../../src/lib/group-by.js');
var mock    = require('../mocks/group-by.mock.js');

test('testing that groupBy function correctly groups the values of an array', function (t) {

	var newArr = groupBy(mock, 'age')
	t.equals( newArr[0].length, 2, "group by works");
	t.end();
});
