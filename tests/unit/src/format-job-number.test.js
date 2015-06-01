var test = require('tape');
var formatJobNumber = require('../../../src/lib/format-job-number.js');

var fakeJobIds = [
	689,
	1,
	9000,
	89
];

var fakeAnswers = [
	"15060689",
	"15060001",
	"15069000",
	"15060089"
];

var i;
var length = fakeJobIds.length;

test('Testing that standard in formatJobNumber is', function (t) {
	t.equals( typeof formatJobNumber, 'function', "a function");
	t.end();
});

for (i =  length; i >= 0; i--) {
	var id 		= fakeJobIds[i]
	var answer 	= fakeAnswers[i];

	test('checking that the result for ' + id + 'is correct', function (t) {
		var result = formatJobNumber(id);

		t.equals( result, answer );
		t.end();
	});

};
