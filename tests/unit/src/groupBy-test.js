var test = require('tape');
var groupBy = require('../../../src/lib/groupBy.js');
var arr = [
        {
            name: 'david',
            age: 22
        },
        {
            name:'jim',
            age: 22
        },
        {
            name:'david',
            age:20
        },
        {
            name:'david',
            age:20
        }
        
    ];



test('testing that groupBy function correctly groups the values of an array', function (t) {
	var newArr = groupBy(arr, 'age')
	t.equals( newArr[0].length, 2, "group by works");
	t.end();
});
