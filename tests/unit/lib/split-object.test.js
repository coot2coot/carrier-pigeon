var test = require('tape');
var splitData = require('../../../server/lib/split-object.js');
var submittedOrder = require('../mocks/add-order.mock.js').fullOrder;
var submittedContact = require('../mocks/add-contact.mock.js').fullContact;

test('Testing that split orders in lib is', function (t) {
	t.equals( typeof splitData, 'function', "a function");
	t.end();
});

test("Split orders comes back in the right format", function (t) {
	var result = splitData(submittedOrder());
	
	t.equals( typeof result, 'object', "it is an object");
	t.equals( !!result.multipleValuesObject, true, "with a unit key");
	t.equals( !!result.singleValueObject, true, "with a order key");
	t.end();
});

test("Split orders comes back within the singleValueObject key with the right result", function (t) {
	var unit = splitData(submittedOrder()).multipleValuesObject;

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

test("Split orders comes back within the singleValueObject key with the right result", function (t) {
	var order = splitData(submittedOrder()).singleValueObject;

	t.equals( order.carrier, "wer");
	t.equals( order.client, "ewer");
	t.equals( order.date, "2015-05-21");
	t.end();
});

test("Split contacts comes back within the multipleValuesObject key with the right result", function (t) {
	var reminder = splitData(submittedContact()).multipleValuesObject;

	t.deepEqual( reminder.message, [ 'sdfg', 'dsfg' ]);
	t.deepEqual( reminder.date, [ '2015-07-31', '2015-08-16' ]);
	t.deepEqual( reminder.reminder_id, [ '3', '4' ]);
	t.end();
});

test("Split contacts comes back within the singleValueObject key with the right result", function (t) {
	var order = splitData(submittedContact()).singleValueObject;

	t.equals( order.contact_id, "251");
	t.equals( order.vat_number, "456ghtd");
	t.equals( order.city, "london");
	t.end();
});