var pg 		 	  = require("pg");
var dataBase      = process.env.POSTGRES_URI || require("../credentials.json").postgres;
var client   	  = new pg.Client("postgres://"+ dataBase + "/carrier-pigeon-dev");
var stringifyData = require("./lib/stringify-data-sql.js");
var dataBase 	  = {};


//TODO: change datatype for date to date, not text
//http://www.postgresql.org/docs/9.3/static/datatype.html
//Then order by date will work

var connect = function (query,table,cb,doc) {
	client.connect(function(err) {
	  	if(err) {
	    	return console.error("could not connect to postgres", err);
	  	}
	  	query(table, cb, doc);
	});
}

function get(table, cb) {
	client.query("SELECT * FROM "+ table +" ORDER by date", function(err, result) {
		client.end();

	    if(err) {
	      return console.error("error running query", err);
	    }
	    cb(result.rows);
	});
}

function post(table, cb, doc) {

	var data = stringifyData(doc);

	client.query("INSERT into " + table + " (" + data.columns +") VALUES ('" + data.values +"')", function(err, result) {
	    if(err) {
	      return console.error("error running query", err);
	    }
	    client.end();
	    cb();
	});
}

function remove(table, cb, doc) {
	client.query("DELETE FROM " + table + " WHERE " + doc.columns +"=" + doc.values, function(err, result) {
	    if(err) {
	    	console.error("error running query", err);
	      	return cb(err);
	    }
	    client.end();
	    cb();
	});
}

dataBase.get = function (table, cb){
 	connect(get,table,cb);
};

dataBase.post = function (table, doc, cb){
	var data = stringifyData(doc);

 	connect(post,table,cb,doc);
};

dataBase.remove = function (table, doc, cb){
 	connect(remove,table,cb,doc);
};

dataBase.getOne = function (table, doc, cb){
 	connect(getOne,table,cb,doc);
};


module.exports = dataBase;