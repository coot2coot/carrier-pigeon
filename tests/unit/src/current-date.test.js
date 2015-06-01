var test = require('tape');
var currentDate = require('../../../src/lib/current-date.js');



test('Testing that standard in currentDate is', function (t) {
	t.equals( typeof currentDate, 'function', "a function");
	t.end();
});

test('checking that the result for is correct', function (t) {
	var result = currentDate();
	var answer = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/

	t.equals( answer.test(result), true );
	t.end();
});
