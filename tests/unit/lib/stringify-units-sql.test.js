var test = require('tape');
var stringify = require('../../../server/lib/stringify-units-sql.js').stringify;
var addUnitMock = require('../mocks/add-order.js').oneUnit;
var mockData = require('../mocks/add-order.js').stringifiedOneUnit;

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

var addMultiUnitMock = require('../mocks/add-order.js').multiUnits;
var multiUnitMockData = require('../mocks/add-order.js').stringifiedMultiUnits;

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


/*********************************
* 	Get Values tests
**********************************/

var getValues = require('../../../server/lib/stringify-units-sql.js').values;

test('Testing that getValues is ', function (t) {
	t.equals( typeof getValues, 'function', "a function");
	t.end();
});

test('getValues returns a str', function (t) {
	var result = getValues(addMultiUnitMock());

	t.equals( typeof result, 'string', "a function");
	t.end();
});

test('getValues returns the correct string', function (t) {
	var result = getValues(addMultiUnitMock());
	var testResult = "(" + multiUnitMockData().values + ")"

	t.equals(result, testResult, "a function");
	t.end();
});

/*********************************
* 	Get Columns tests
**********************************/

var getColumns = require('../../../server/lib/stringify-units-sql.js').columns;

test('Testing that getColumns is ', function (t) {
	t.equals( typeof getColumns, 'function', "a function");
	t.end();
});

test('getColumns returns a str', function (t) {
	var result = getColumns(addMultiUnitMock());

	t.equals( typeof result, 'string', "a function");
	t.end();
});

test('getColumns returns the correct string', function (t) {
	var result = getColumns(addMultiUnitMock());

	t.equals(result, multiUnitMockData().columns, "a function");
	t.end();
});

/*********************************
* 	Has Job Number tests
**********************************/

var hasJobNumber = require('../../../server/lib/stringify-units-sql.js').hasJobNumber;

test('Testing that hasJobNumber function is', function (t) {
	t.equals( typeof hasJobNumber, 'function', "a function");
	t.end();
});

test('hasJobNumber if given undefined', function (t) {
	var job_number = hasJobNumber(undefined);
	var str = "(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)";

	t.equals( job_number, str, "returns correct string");
	t.end();
});

test('hasJobNumber if given a job_number', function (t) {
	var num = 55;
	var job_number = hasJobNumber(num);

	t.equals( job_number, num, "returns correct string");
	t.end();
});
