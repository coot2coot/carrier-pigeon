var test = require('tape');
var sorts = require('../../../src/lib/order-by-job-number.js');
var arr = [
	{
		job_number: 1234
	},
	{
		job_number: 12234234
	}
];



test('testing that order-by-job-number function return an array in deccending order of job number', function (t) {
	var sort = sorts(arr);
	t.equals( arr[0].job_number, 12234234, "sort functon works");
	t.end();
});
