
function sort (array) {
	array.sort(function (a,b) {
		return a.job_number - b.job_number
	})
	return array
}

module.exports = sort;