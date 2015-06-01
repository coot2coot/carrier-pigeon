(function () {
	"use strict"

	var getCurrentDate = function () {
	    var today = new Date();

	    var dd = today.getDate();
	    var mm = today.getMonth()+1;
	    var yyyy = today.getFullYear();

	    if (dd < 10){
	        dd = '0' + dd;
	    }
	    if (mm < 10) {
	        mm = '0' + mm;
	    }

	    var todayDate = yyyy + "-" + mm + "-" + dd;
	    return todayDate;
	}

	module.exports = getCurrentDate;
}());