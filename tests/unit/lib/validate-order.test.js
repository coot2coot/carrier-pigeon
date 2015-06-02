var test = require('tape');
var validateOrder = require('../../../server/lib/validate-order.js').validate;
var dateIsValid = require('../../../server/lib/validate-order.js').dateIsValid;

var orderMock = require('../mocks/add-order.mock.js').fullOrder;

var res = {};
res.writeHead = function (code) {
	return code;
}
res.write = function (message) {
	return message;
}
res.end = function () {
	return "failed validation";
}

/********************************
* 	Validate Tests
*********************************/

test('Testing that validateOrder in lib is', function (t) {
	t.equals( typeof validateOrder, 'function', "a function");
	t.end();
});

test('the vaidate order module must check that all nesasarry fields have been filled in', function (t) {
	var ok;

	function cb () {
		ok = 1;
		return ok;
	}
	
	validateOrder(orderMock(), res, cb);

	t.equals(ok, 1, "validate order module returns a callback when the order is valid");
	t.end();

});

test('if validation doesnt pass, res.end()', function (t) {
	var data = orderMock();
	var cb = function () {
		console.log("whoops");
	}

	var message;
	data.date = "30-50-20";
	
	res.end = function () {
		message = "failed validation";
	}
	
	validateOrder(data, res, cb);

	t.equals(message, "failed validation");
	t.end();
});

/********************************
* 	Date Is Valid Tests
*********************************/

test('Testing that dateIsValid is', function (t) {
	t.equals( typeof dateIsValid, 'function', "a function");
	t.end();
});

test('if wrong date format, dateIsValid comes back as false', function (t) {
	var result = dateIsValid("40-20-1");

	t.equals( result, null);
	t.end();
});

test('if wrong date format, dateIsValid comes back as correct', function (t) {
	var result = dateIsValid("2015-05-20")[0];

	t.equals( result, "2015-05-20");
	t.end();
});