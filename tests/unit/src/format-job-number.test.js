var test 			= require('tape');
var formatJobNumber = require('../../../src/lib/format-job-number.js');

var today 			= new Date();
var mm 				= ("0" + (today.getMonth()+1)).slice(-2);
var yy 				= today.getFullYear().toString().slice(-2);

var i;


var fakeJobIds = [
	689,
	1,
	9000,
	89,
	10678
];

var length = fakeJobIds.length;

var fakeAnswers = [
	yy + mm + "0689",
	yy + mm + "0001",
	yy + mm + "9000",
	yy + mm + "0089",
	yy + mm + "10678"
];

test('Testing that standard in formatJobNumber is', function (t) {
	t.equals( typeof formatJobNumber, 'function', "a function");
	t.end();
});

for (i =  length; i >= 0; i--) {
	var id 		= fakeJobIds[i]
	var answer 	= fakeAnswers[i];

	test('checking that the result for ' + id + ' is correct', function (t) {
		var result = formatJobNumber(id);

		t.equals( result, answer );
		t.end();
	});
};
