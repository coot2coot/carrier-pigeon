var test 		= require('tape');
var getQuery 	= require('../../../server/lib/edit-query-sql.js').getQuery;
var getLength 	= require('../../../server/lib/edit-query-sql.js').getLength;
var getJobNo 	= require('../../../server/lib/edit-query-sql.js').getJobNumber;

var unitMocks 	= require('../mocks/edit-order.mock.js');
var invoiceMocks = require('../mocks/invoice.mock.js');

var standard 	= getQuery.standard;
var updateQuery = getQuery.update;
var deleteQuery = getQuery.del;


/********************************
* 	  	Standard Query
*********************************/

test('Testing that standard query for users works', function (t) {
	var mock = unitMocks.user();
	var test = standard(mock, "units", "unit_id");
  	var result = "first_name='Natalia',last_name='Baltazar',invitation='true'"

	t.equals( test, result);
	t.end();
});



/********************************
* 	   Create Query Tests
*********************************/

test('Testing that result returned correct unit create query', function (t) {
  	var mock = unitMocks.createUnit();
  	var create = updateQuery(mock, "units", "unit_id").create;
  	var result = "INSERT INTO units (unit_number,unit_type,unit_loading_reference," +
  				"unit_loading_date,unit_loading_time,unit_weight,unit_net_weight," +
  				"unit_gross_weight,unit_volume,unit_commodity_description," +
  				"unit_no_of_packages,unit_kind_of_packages,job_number) VALUES " +
				"('ertert','ertet','etert','2015-06-11','04:03','kg','3.2','4.6'," +
				"'2.5','ertert','3','ete',566); ";
	
	t.equals(create , result);
	t.end();
});

test('Testing that create returned no unit create query if there was nothing to create', function (t) {
  	var mock = unitMocks.updateUnits();
  	var create = updateQuery(mock, "units", "unit_id").create;
  	var result = "";
	
	t.equals(create , result);
	t.end();
});

test('Testing that result returned correct invoice create query', function (t) {
	var data = invoiceMocks.createRes();
  	var query = updateQuery(data, "invoice", "invoice_id").create;
  	var result = invoiceMocks.createTest();
	
	t.equals( query, result );
	t.end();
});

test('Testing that result returned correct invoice create query, even if only one', function (t) {
	var data = invoiceMocks.createOne();
  	var query = updateQuery(data, "invoice", "invoice_id").create;
  	var result = invoiceMocks.createTest();
	
	t.equals( query, result );
	t.end();
});



/********************************
* 		Delete Query Tests
*********************************/

test('Testing that deleting one item returned correct unit delete query', function (t) {
	var data = "708";
  	var query = deleteQuery(data, "units", "unit_id");
  	var result = "DELETE FROM units WHERE unit_id = 708;";
	
	t.equals( query, result );
	t.end();
});

test('Testing that deleting three items returned correct unit delete queries', function (t) {
	var data = "710,709,707";
  	var query = deleteQuery(data, "units", "unit_id");
  	var result = "DELETE FROM units WHERE unit_id = 710;" +
  				"DELETE FROM units WHERE unit_id = 709;" +
  				"DELETE FROM units WHERE unit_id = 707;"
	
	t.equals( query, result );
	t.end();
});

test('Testing that result returned correct inovice delete query', function (t) {
	var data = invoiceMocks.createRes().delete_invoice;
  	var query = deleteQuery(data, "invoice", "invoice_id");
  	var result = invoiceMocks.deleteTest();
	
	t.equals( query, result );
	t.end();
});

test('Testing that if result is nothing, no invoice delete query is returned', function (t) {
	var data = "";
  	var query = deleteQuery(data, "invoice", "invoice_id");
	
	t.equals( query, "" );
	t.end();
});



/********************************
* 	  Update Query Tests
*********************************/

test('Testing that result returned correct update queries for units', function (t) {
	var mock = unitMocks.updateUnits();
  	var update = updateQuery(mock, "units", "unit_id").update;
  	var result = "UPDATE units SET unit_number='Unit no.',unit_type='40dc'," +
  	"unit_loading_reference='342',unit_loading_date=null,unit_loading_time='03:04:00'" +
  	",unit_net_weight='3',unit_gross_weight='4',unit_volume='4'," +
  	"unit_commodity_description='stwhuwher',unit_no_of_packages='4'," +
  	"unit_kind_of_packages='dunno' WHERE unit_id=92; UPDATE units SET " +
  	"unit_number='unit No',unit_type='unit Type',unit_loading_reference='wer'," +
  	"unit_loading_date=null,unit_loading_time='02:03:00',unit_net_weight='4'," +
  	"unit_gross_weight='4',unit_volume='3',unit_commodity_description='more stuff'," +
  	"unit_no_of_packages='-3',unit_kind_of_packages='still dunno' WHERE unit_id=93; " +
  	"UPDATE units SET unit_number='werw',unit_type='wer',unit_loading_reference='wer'," +
  	"unit_loading_date=null,unit_loading_time='21:04:00',unit_net_weight='5'," +
  	"unit_gross_weight='5',unit_volume='5',unit_commodity_description='????'," +
  	"unit_no_of_packages='5',unit_kind_of_packages='ejfi' WHERE unit_id=94; ";
	
	t.equals( update, result);
	t.end();
});

test('Testing that result returned correct update query for invoices', function (t) {
	var data = invoiceMocks.createRes();
  	var query = updateQuery(data, "invoice", "invoice_id").update;
  	var result = invoiceMocks.updateTest();
	
	t.equals( query, result );
	t.end();
});

test('Testing that if there is nothing to update, no update query will comeback for invoices', function (t) {
	var data = invoiceMocks.createOne();
  	var query = updateQuery(data, "invoice", "invoice_id").update;
	
	t.equals( query, "" );
	t.end();
});

test('Another Test, fixing a bug', function (t) {
	var data = invoiceMocks.another();
  	var queries = updateQuery(data, "invoice", "invoice_id");
  	var result = invoiceMocks.anotherTest();

	t.equals( queries.update, result.update );
	t.equals( queries.create, result.create );
	t.end();
});



/********************************
* 	  Get Length Tests
*********************************/

test('Testing that if invoices obj is used', function (t) {
	var mock = invoiceMocks.createRes();
  	var query = getLength("invoice", mock);

	t.equals( query, 6 , "the correct length comes back");
	t.end();
});

test('Testing that if units obj is used', function (t) {
	var mock = unitMocks.updateUnits();
  	var query = getLength("units", mock);
	
	t.equals( query, 3 , "the correct length comes back");
	t.end();
});



/********************************
* 	  Get Job Number Tests
*********************************/

test('Testing that if invoices obj is used', function (t) {
	var mock = invoiceMocks.createOne();
  	var query = getJobNo(mock);

	t.equals( query, "317" , "returns the correct job Number");
	t.end();
});

test('Testing that if units obj is used', function (t) {
	var mock = unitMocks.createUnit();
  	var query = getJobNo(mock, 0);
	
	t.equals( query, "566" , "get the job Number out of the array");
	t.end();
});
