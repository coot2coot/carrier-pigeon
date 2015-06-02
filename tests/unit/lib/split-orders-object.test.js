var test = require('tape');
var splitData = require('../../../server/lib/split-orders-object.js');
var submittedOrder = require('../mocks/add-order.mock.js').fullOrder;

test('Testing that split orders in lib is', function (t) {
	t.equals( typeof splitData, 'function', "a function");
	t.end();
});

test("Split orders comes back in the right format", function (t) {
	var result = splitData(submittedOrder());
	
	t.equals( typeof result, 'object', "it is an object");
	t.equals( !!result.unit, true, "with a unit key");
	t.equals( !!result.order, true, "with a order key");
	t.end();
});

test("Split orders comes back within the unit key with the right result", function (t) {
	var unit = splitData(submittedOrder()).unit;

	t.equals( unit.job_number, undefined);
	t.deepEqual( unit.unit_commodity_description, ['', '']);
	t.deepEqual( unit.unit_gross_weight, [ '', '' ]);
	t.deepEqual( unit.unit_net_weight, [ '', '' ]);
	t.deepEqual( unit.unit_kind_of_packages, [ '', '' ]);
	t.deepEqual( unit.unit_loading_date, [ '', '' ]);
	t.deepEqual( unit.unit_loading_time, [ '', '' ]);
	t.deepEqual( unit.unit_loading_reference, [ '', '' ]);
	t.deepEqual( unit.unit_no_of_packages, [ '', '' ]);
	t.deepEqual( unit.unit_number, [ "wer", "wer" ]);
	t.deepEqual( unit.unit_type, [ "wer", "wer" ]);
	t.deepEqual( unit.unit_volume, [ '', '' ]);
	t.end();
});

test("Split orders comes back within the order key with the right result", function (t) {
	var order = splitData(submittedOrder()).order;

	t.equals( order.carrier, "wer");
	t.equals( order.client, "ewer");
	t.equals( order.date, "2015-05-21");
	t.end();
});