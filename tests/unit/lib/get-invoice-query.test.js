var test = require('tape');
var invoiceQuery = require('../../../server/lib/get-invoice-query.js').query;
var mocks = require('../mocks/invoice.js');

/********************************
* 	  Editing Query Standard
*********************************/

var standard = invoiceQuery.standard;

test('Testing that standard in invoice query is', function (t) {
	t.equals( typeof standard, 'function', "a function");
	t.end();
});

// test('Testing that stringify data in lib is', function (t) {
//   	var data = mocks.createRes();

// 	t.equals(data, "", "a function");
// 	t.end();
// });


// /********************************
// * 	   Editing Query Units
// *********************************/

var invoice = invoiceQuery.invoice;

test('Testing that get invoice query', function (t) {
	t.equals( typeof invoice, 'function', "a function");
	t.end();
});

test('Testing that result returned correct create query', function (t) {
	var data = mocks.createRes();
  	var query = invoice(data);
  	var result = mocks.createTest();
	
	t.equals(query , result);
	t.end();
});

// /********************************
// * 	Editing Query Units Delete
// *********************************/

// var deleteUnits = editQuery.query.unitDelete;