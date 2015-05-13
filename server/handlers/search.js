"use strict";
var db 			 = require("../db-config.js");
var validateUser = require('../lib/validate-user.js');

function search (req, res) {
	var data = req.url.split("/").pop();
	validateUser(req,res, function (){
		db.searcher('orders',data, function (err,orders) {
			if(err){
				res.writeHead(303, {
					"Location": "/#/orders/show/error"
				});
				return res.end();
			}else{
				var order = JSON.stringify(orders);

				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(order);
			}
		})
	})
};


module.exports = search;
