var test = require('tape');
var stringify = require('../../../server/lib/stringify-data-sql.js');
var addOrderMock = require('../mocks/add-order.mock.js').order;
var mockData = require('../mocks/add-order.mock.js').stringifiedTestData;

test('Testing that stringify data in lib is', function (t) {
	t.equals( typeof stringify, 'function', "a function");
	t.end();
});

test('when stringify data is given a result, returns data with correct keys', function (t) {

	var data = stringify(addOrderMock());

	t.equals( typeof data, 'object', "returns an obj");
	t.equals( !!data.columns, true, "with a columns key");
	t.equals( !!data.values, true, "with a values key");
	t.end();
});

test('when stringify data is given a result, returns data with columns format', function (t) {

	var data = stringify(addOrderMock());
	var mockColumns = mockData().columns;

	t.equals( typeof data.columns, 'string', "is a string");
	t.equals( data.columns, mockColumns, "returned with the right string");
	t.end();
});

test('when stringify data is given a result, returns data with values format', function (t) {

	var data = stringify(addOrderMock());
	var mockValues = mockData().values;

	t.equals( typeof data.values, 'string', "is a string");
	t.equals( data.values, mockValues, "returned with the right string");
	t.end();
});