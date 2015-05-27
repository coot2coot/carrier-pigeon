var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");


function organiseInvoices (array) {
	var invoices = {};
	var sales = [];
	var purchase = [];
  
    array.map(function(invoice) {
        if (invoice.type === "purchase") {
           	purchase.push(invoice);
        } else if (invoice.type === "sales") {
            sales.push(invoice);
        }
    })
		
  	invoices.sales = sales;
  	invoices.purchase = purchase;
  
  	return invoices;
}

function getInvoices (req, res) {
	var jobNo = req.url.split("/").pop();

	validateUser(req,res, function (){
		db.getInvoices("invoice", jobNo, function (err, invoices) {
			if (err) {
				return console.log(err);
			}

			var sorted = organiseInvoices(invoices);
			var stringInvoices = JSON.stringify(sorted);

			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.end(stringInvoices);
		})
	})
};

module.exports = getInvoices;