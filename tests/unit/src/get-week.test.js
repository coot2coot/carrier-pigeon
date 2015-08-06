var test = require('tape');
var getWeek = require('../../../src/lib/get-week.js');
var arr = [
	{
		date: "Wed, 03 Jan 2015 07:41:58 GMT"
	},
	{
		date: "Wed, 09 Jan 2015 07:41:58 GMT"
	}
];



test('testing that getWeek function calculates the week of the year', function (t) {
	var newArr = getWeek(arr);
	t.equals( newArr[0].week, 2, "weekday functon works");
	t.end();
});
