var test 		= require('tape');
var getQuery 	= require('../../../server/lib/edit-query-sql.js').getQuery;
var mocks 		= require('../mocks/edit-order.mock.js');

var standard 	= getQuery.standard;
var updateQuery = getQuery.update;
var deleteUnits = getQuery.del;



/********************************
* 	  	Standard Query
*********************************/

test('Testing that standard in editquery is', function (t) {
	t.equals( typeof standard, 'function', "a function");
	t.end();
});

test('Testing that stringify data in lib is', function (t) {
  	var result = "first_name='Natalia',last_name='Baltazar',invitation='true'"

	t.equals( standard(mocks.user(), "units", "unit_id"), result, "a function");
	t.end();
});



/********************************
* 	   Create Query Tests
*********************************/

test('Testing that result returned correct create query', function (t) {
  	var mock = mocks.createUnit();
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

test('Testing that create returned no query if there was nothing to create', function (t) {
  	var mock = mocks.updateUnits();
  	var create = updateQuery(mock, "units", "unit_id").create;
  	var result = "";
	
	t.equals(create , result);
	t.end();
});



/********************************
* 		Delete Query Tests
*********************************/

test('Testing that deleting one item returned correct delete query', function (t) {
	var data = "708";
  	var query = deleteUnits(data, "units", "unit_id");
  	var result = "DELETE FROM units WHERE unit_id = " + data + ";";
	
	t.equals( query, result );
	t.end();
});

test('Testing that deleting three items returned correct delete query', function (t) {
	var data = "708";
  	var query = deleteUnits(data, "units", "unit_id");
  	var result = "DELETE FROM units WHERE unit_id = 708;";
	
	t.equals( query, result );
	t.end();
});

test('Testing that if result is nothing, no delete query is returned', function (t) {
	var data = "710,709,707";
  	var query = deleteUnits(data, "units", "unit_id");
  	var result = "DELETE FROM units WHERE unit_id = 710;" +
  				"DELETE FROM units WHERE unit_id = 709;" +
  				"DELETE FROM units WHERE unit_id = 707;"
	
	t.equals( query, result );
	t.end();
});



/********************************
* 	  Update Query Tets
*********************************/

test('Testing that result returned correct update queries', function (t) {
	var mock = mocks.updateUnits();
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

