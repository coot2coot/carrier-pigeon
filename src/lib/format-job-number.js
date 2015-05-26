(function () {
	"use strict"

	var formatJobNumber = function (dbId) {
	    var today = new Date();
	  
		var id = ("0000" + dbId).slice(-4);
	    var mm = ("0" + (today.getMonth()+1)).slice(-2);
	    var yy = today.getFullYear().toString().slice(-2);
	  
	    return yy + mm + id;
	}

	module.exports = formatJobNumber;
}());
