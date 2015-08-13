var test 					= require('tape');
var stringify 				= require('../../../server/lib/stringify-units-reminders-sql.js').stringify;

var addUnitMock 			= require('../mocks/add-order.mock.js').oneUnit;
var addReminderMock 		= require('../mocks/add-contact.mock.js').oneReminder;
var mockData 				= require('../mocks/add-order.mock.js').stringifiedOneUnit;
var addMultiUnitMock  		= require('../mocks/add-order.mock.js').multiUnits;
var addMultiReminderMock  	= require('../mocks/add-contact.mock.js').multiReminders;
var multiUnitMockData 		= require('../mocks/add-order.mock.js').stringifiedMultiUnits;
var multiReminderMockData 	= require('../mocks/add-contact.mock.js').stringifiedMultiReminders;


test('Testing that stringify units in lib is', function (t) {
	t.equals( typeof stringify, 'function', "a function");
	t.end();
});

test('when stringify units is given a result, returns data with correct keys', function (t) {

	var data = stringify(addUnitMock(), 'unit_type', 'job_number');

	t.equals( typeof data, 'object', "returns an obj");
	t.equals( !!data.columns, true, "with a columns key");
	t.equals( !!data.values, true, "with a values key");
	t.end();
});

test('when stringify reminders is given a result, returns data with correct keys', function (t) {

	var data = stringify(addReminderMock(), 'reminder_message', 'contact_id');

	t.equals( typeof data, 'object', "returns an obj");
	t.equals( !!data.columns, true, "with a columns key");
	t.equals( !!data.values, true, "with a values key");
	t.end();
});

/********************************
* 	For adding a single Unit
*********************************/

test('when stringify data is given a result, returns data with columns format', function (t) {

	var data = stringify(addUnitMock(), 'unit_type', 'job_number');
	var mockColumns = mockData().columns;

	t.equals( typeof data.columns, 'string', "is a string");
	t.equals( data.columns, mockColumns, "returned with the right string");
	t.end();
});

test('when stringify data is given a result, returns data with values format', function (t) {

	var data = stringify(addUnitMock(), 'unit_type', 'job_number');
	var mockValues = mockData().values;

	t.equals( typeof data.values, 'string', "is a string");
	t.equals( data.values, mockValues, "returned with the right string");
	t.end();
});


/*********************************
* 	For adding a Multiple Units
**********************************/

test('when stringify data is given a result with multiple units, returns data with columns format', function (t) {

	var data = stringify(addMultiUnitMock(), 'unit_type', 'job_number');
	var mockColumns = multiUnitMockData().columns;

	t.equals( typeof data.columns, 'string', "is a string");
	t.equals( data.columns, mockColumns, "returned with the right string");
	t.end();
});

test('when stringify data is given a result with multiple reminders, returns data with columns format', function (t) {

	var data = stringify(addMultiReminderMock(), 'date', 'contact_id');
	var mockColumns = multiReminderMockData().columns;

	t.equals( typeof data.columns, 'string', "is a string");
	t.equals( data.columns, mockColumns, "returned with the right string");
	t.end();
});

test('when stringify data is given a result, returns data with values format', function (t) {

	var data = stringify(addMultiUnitMock(), 'unit_type', 'job_number');
	var mockValues = multiUnitMockData().values;

	t.equals( typeof data.values, 'string', "is a string");
	t.equals( data.values, mockValues, "returned with the right string");
	t.end();
});

test('when stringify data is given a result with multiple reminders, returns data with values format', function (t) {

	var data = stringify(addMultiReminderMock(), 'date', 'contact_id');
	var mockValues = multiReminderMockData().values;

	t.equals( typeof data.values, 'string', "is a string");
	t.equals( data.values, mockValues, "returned with the right string");
	t.end();
});


/*********************************
* 	Get Values tests
**********************************/

var getValues = require('../../../server/lib/stringify-units-reminders-sql.js').values;

test('Testing that getValues is ', function (t) {
	t.equals( typeof getValues, 'function', "a function");
	t.end();
});

test('getValues returns a str', function (t) {
	var result = getValues(addMultiUnitMock(), 'unit_type', 'job_number');

	t.equals( typeof result, 'string', "a function");
	t.end();
});

test('getValues returns the correct string', function (t) {
	var result = getValues(addMultiUnitMock(), 'unit_type', 'job_number');
	var testResult = "(" + multiUnitMockData().values + ")"

	t.equals(result, testResult, "a function");
	t.end();
});

/*********************************
* 	Get Columns tests
**********************************/

var getColumns = require('../../../server/lib/stringify-units-reminders-sql.js').columns;

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

var hasId = require('../../../server/lib/stringify-units-reminders-sql.js').hasId;

test('Testing that hasId function is', function (t) {
	t.equals( typeof hasId, 'function', "a function");
	t.end();
});

test('hasId if given job_number as id', function (t) {
	var id = hasId('job_number');
	var str = "(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)";

	t.equals( id, str, "returns correct string");
	t.end();
});

test('hasId if given contact_id as id', function (t) {
	var id = hasId('contact_id');
	var str = "(SELECT contact_id FROM contacts ORDER BY contact_id DESC LIMIT 1)";

	t.equals( id, str, "returns correct string");
	t.end();
});

