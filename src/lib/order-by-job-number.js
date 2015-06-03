(function () {
	"use strict";
	var sort =function (array) {
		array.sort(function (a,b) {
			return b.job_number - a.job_number
		})
		return array
	}
	module.exports = sort;
})();

