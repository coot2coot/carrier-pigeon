"use strict";
var db 			 = require("../db-config.js");
var validateUser = require('../lib/validate-user.js');

function search (req, res, table) {
	var data = req.url.split("/").pop();
	var cleanedData;

	if (data.indexOf('SLASH') > -1) {
		cleanedData = data.replace("SLASH", "/");
	} else {
		cleanedData = data;
	}

	validateUser(req,res, function (){
		db.searcher(table,cleanedData, function (err,orders) {
			if(err){
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end('error');
			}else{
				var order = JSON.stringify(orders);
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(order);
			}
		});
	});
}


module.exports = search;
