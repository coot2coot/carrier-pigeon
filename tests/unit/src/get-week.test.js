var test = require('tape');
var getWeek = require('../../../src/lib/get-week.js');
var groupBy = require('../../../src/lib/group-by.js');
var arr = [
	{
		date: "Wed, 03 Jun 2015 07:41:58 GMT",
		contact_id: 1
	},
	{
		date: "Wed, 09 Jan 2015 07:41:58 GMT",
		contact_id: 3
	},
	{
		date: "Wed, 06 Oct 2015 07:41:58 GMT",
		contact_id: 2
	}
];

test('testing that getWeek.inRange function calculates the week of the year', function (t) {

	var newArr = getWeek.inRange(arr);
	t.equals( newArr[0].week, 3, "weekday functon works");
	t.end();
});

test('testing that getWeek.inRange function calculates the week of the year', function (t) {

	var newArr = getWeek.inRange(arr);
	var groupArr = groupBy(newArr, 'contact_id');

	var narr = getWeek.filter(groupArr);

	t.equals( narr.length, 2, "weekday functon works");
	t.end();
});
