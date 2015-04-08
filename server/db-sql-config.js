var pg = require("pg");
var dataBase = process.env.POSTGRESS || require('../credentials.json').postgres 
var param = "postgres://" + dataBase + "/carrier-pigeon-dev";
;
var client = new pg.Client(param);
var dataBase = {};


var connect = function (query,table,cb) {
	client.connect(function(err) {
	  	if(err) {
	    	return console.error('could not connect to postgres', err);
	  	}
	  	query(table,cb);
	});
}

function get(table, cb) {
	client.query('SELECT * FROM '+ table +';', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    cb(result.rows);
	    client.end();
	});
}

function put(table, cb, doc) {
	client.query('INSERT INTO ' + table + ' ' + doc.columns+' VALUES ' + doc.values, function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.end();
	    cb();
	});
}

function remove(table, cb, doc) {
	client.query('DELETE FROM ' + table + ' WHERE ' + cd.column +' = ' + cd.column.values, function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.end();
	    cb();
	});
}

dataBase.get = function (table, cb){
 	connect(get,table,cb);
};

dataBase.put = function (table, cb, doc){
 	connect(put,table,cb,doc);
};

dataBase.remove = function (table, cb, doc){
 	connect(remove,table,cb,doc);
};


module.exports = dataBase;