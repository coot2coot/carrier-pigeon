var test = require('tape');
var stringify = require('../../../server/lib/stringify-units-sql.js').stringify;
var addUnitMock = require('../mocks/add-order.js').oneUnit;
var mockData = require('../mocks/add-order.js').stringifiedOneUnit;
var addMultiUnitMock = require('../mocks/add-order.js').multiUnits;
var multiUnitMockData = require('../mocks/add-order.js').stringifiedMultiUnits;


test('Testing that stringify units in lib is', function (t) {
	t.equals( typeof stringify, 'function', "a function");
	t.end();
});

test('when stringify units is given a result, returns data with correct keys', function (t) {

	var data = stringify(addUnitMock());

	t.equals( typeof data, 'object', "returns an obj");
	t.equals( !!data.columns, true, "with a columns key");
	t.equals( !!data.values, true, "with a values key");
	t.end();
});

/********************************
* 	For adding a single Unit
*********************************/

test('when stringify data is given a result, returns data with columns format', function (t) {

	var data = stringify(addUnitMock());
	var mockColumns = mockData().columns;

	t.equals( typeof data.columns, 'string', "is a string");
	t.equals( data.columns, mockColumns, "returned with the right string");
	t.end();
});

test('when stringify data is given a result, returns data with values format', function (t) {

	var data = stringify(addUnitMock());
	var mockValues = mockData().values;

	t.equals( typeof data.values, 'string', "is a string");
	t.equals( data.values, mockValues, "returned with the right string");
	t.end();
});


/*********************************
* 	For adding a Multiple Units
**********************************/

test('when stringify data is given a result, returns data with columns format', function (t) {

	var data = stringify(addMultiUnitMock());
	var mockColumns = multiUnitMockData().columns;

	t.equals( typeof data.columns, 'string', "is a string");
	t.equals( data.columns, mockColumns, "returned with the right string");
	t.end();
});

test('when stringify data is given a result, returns data with values format', function (t) {

	var data = stringify(addMultiUnitMock());
	var mockValues = multiUnitMockData().values;

	t.equals( typeof data.values, 'string', "is a string");
	t.equals( data.values, mockValues, "returned with the right string");
	t.end();
});