var test = require('tape');
var invoiceQuery = require('../../../server/lib/get-invoice-query.js').query;
var mocks = require('../mocks/invoice.js');

var invoice = invoiceQuery.invoice;
var invoiceDelete = invoiceQuery.invoiceDelete;

test('Testing that get invoice query', function (t) {
	t.equals( typeof invoice, 'function', "a function");
	t.end();
});

/*****************************
* 		Create Query
******************************/

test('Testing that result returned correct create query', function (t) {
	var data = mocks.createRes();
  	var query = invoice(data).create;
  	var result = mocks.createTest();
	
	t.equals( query, result );
	t.end();
});

test('Testing that result returned correct create query, even if only one', function (t) {
	var data = mocks.createOne();
  	var query = invoice(data).create;
  	var result = mocks.createTest();
	
	t.equals( query, result );
	t.end();
});

/*****************************
* 		Update Query
******************************/

test('Testing that result returned correct update query', function (t) {
	var data = mocks.createRes();
  	var query = invoice(data).update;
  	var result = mocks.updateTest();
	
	t.equals( query, result );
	t.end();
});

test('Testing that if there is nothing to update, no update query will comeback', function (t) {
	var data = mocks.createOne();
  	var query = invoice(data).update;
	
	t.equals( query, "" );
	t.end();
});


/*****************************
* 		Delete Query
******************************/

test('Testing that result returned correct delete query', function (t) {
	var data = mocks.createRes().delete_invoice;
  	var query = invoiceDelete(data);
  	var result = mocks.deleteTest();
	
	t.equals( query, result );
	t.end();
});

test('Testing that if result is nothing, no delete query is returned', function (t) {
	var data = "";
  	var query = invoiceDelete(data);
	
	t.equals( query, "" );
	t.end();
});