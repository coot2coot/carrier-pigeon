(function () {
	"use strict"

	function formatDate (date) {
	    var d = new Date(date);

	    var dd = d.getDate();
	    var mm = d.getMonth()+1;
	    var yyyy = d.getFullYear();

	    if (dd < 10){
	        dd = '0' + dd;
	    }
	    if (mm < 10) {
	        mm = '0' + mm;
	    }

	    var formattedDate = dd + "." + mm + "." + yyyy;
	    return formattedDate;
	}
 
	module.exports = formatDate;
}());