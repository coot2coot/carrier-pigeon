/*
 * Please note that this format only works for up to 5 digits
 * Will have to be configured if Coot frieght makes more than 10000 orders.
 */

(function () {
	"use strict"

	function formatJobNumber (dbId, orderDate) {

		if (dbId) {

			var idLength 	= dbId.toString().length;
			var day 		= new Date(orderDate);
			var mm 			= ("0" + (day.getMonth()+1)).slice(-2);
			var yy 			= day.getFullYear().toString().slice(-2);

			if (idLength < 5) {

				var id = ("0000" + dbId).slice(-4);
			} else {
				var id = ("00000" + dbId).slice(-5);
			}

			return yy + mm + id;
		}
	}

	module.exports = formatJobNumber;
}());
