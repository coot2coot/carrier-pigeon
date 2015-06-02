var test = require('tape');
var sorts = require('../../../src/lib/order-by-job-number.js');
var arr = [
	{
		job_number: 1234
	},
	{
		job_number: 12
	}
];



test('testing that order-by-job-number function return an array in accending order of job number', function (t) {
	var sort = sorts(arr);
	t.equals( arr[0].job_number, 12, "sort functon works");
	t.end();
});
