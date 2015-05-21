var test = require('tape');
var editQuery = require('../../../server/lib/edit-query-sql.js');
var mocks = require('../mocks/edit-order.js');
/********************************
* 	  Editing Query Standard
*********************************/

var standard = editQuery.query.standard;

test('Testing that standard in editquery is', function (t) {
	t.equals( typeof standard, 'function', "a function");
	t.end();
});

test('Testing that stringify data in lib is', function (t) {
  	var result = "first_name='Natalia',last_name='Baltazar',invitation='true'"

	t.equals( standard(mocks.user()), result, "a function");
	t.end();
});


/********************************
* 	   Editing Query Units
*********************************/

var units = editQuery.query.units;

test('Testing that edit unit query is', function (t) {
	t.equals( typeof units, 'function', "a function");
	t.end();
});

test('Testing that result returned correct queries', function (t) {
  	var update = units(mocks.units()).update;
  	var create = units(mocks.units()).create;
  	var testUpdateStr = "UPDATE units SET unit_number='Unit no.',unit_type='40dc',unit_loading_reference='342',unit_loading_date=null,unit_loading_time='03:04:00',unit_net_weight='3',unit_gross_weight='4',unit_volume='4',unit_commodity_description='stwhuwher',unit_no_of_packages='4',unit_kind_of_packages='dunno' WHERE unit_id=92; UPDATE units SET unit_number='unit No',unit_type='unit Type',unit_loading_reference='wer',unit_loading_date=null,unit_loading_time='02:03:00',unit_net_weight='4',unit_gross_weight='4',unit_volume='3',unit_commodity_description='more stuff',unit_no_of_packages='-3',unit_kind_of_packages='still dunno' WHERE unit_id=93; UPDATE units SET unit_number='werw',unit_type='wer',unit_loading_reference='wer',unit_loading_date=null,unit_loading_time='21:04:00',unit_net_weight='5',unit_gross_weight='5',unit_volume='5',unit_commodity_description='????',unit_no_of_packages='5',unit_kind_of_packages='ejfi' WHERE unit_id=94; ";
	
	t.equals(create , "");
	t.equals( update, testUpdateStr);
	t.end();
});

/********************************
* 	Editing Query Units Delete
*********************************/

var deleteUnits = editQuery.query.unitDelete;


/********************************
* 	  Get Update Query Tets
*********************************/

var updateQuery = editQuery.getUpdateQuery;

