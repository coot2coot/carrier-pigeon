var pg 		 = require("pg");
var dataBase = process.env.POSTGRES_URI || require('../credentials.json').postgres;
var client   = new pg.Client("postgres://"+ dataBase + "/carrier-pigeon-dev");

var dataBase = {};


var connect = function (query,table,cb,doc) {
	client.connect(function(err) {
	  	if(err) {
	    	return console.error('could not connect to postgres', err);
	  	}
	  	query(table, cb, doc);
	});
}

function get(table, cb) {
	client.query('SELECT * FROM '+ table +';', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.end();
	    cb(result.rows);
	});
}

function getOne(table, cb, doc) {
	client.query('SELECT * FROM ' + table + ' WHERE ' +doc.columns +'=' + doc.values, function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.end();
	    cb(result.rows);
	});
}

function stringifyData (result) {
	var data = {},
		value = [],
		keys = [];

	for(var k in result) {
		keys.push(k);
	    value.push(result[k]);
	}

	console.log(keys.length, value.length);
	data.columns = keys.join(", ");
	data.values = value.join(", ");
	
	return data;
}

function post(table, cb, doc) {

	var data = stringifyData(doc);

	console.log(table);
	console.log('(' + data.columns + ')', data.columns.length);
	console.log('(' + data.values + ')', data.values.length)

	client.query('INSERT into ' + table + ' (' + data.columns +') VALUES (' + data.values +')', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    client.end();
	    cb();
	});
}

function remove(table, cb, doc) {
	client.query('DELETE FROM ' + table + ' WHERE ' + doc.columns +'=' + doc.values, function(err, result) {
	    if(err) {
	    	console.error('error running query', err);
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
 	connect(post,table,cb,doc);
};

dataBase.remove = function (table, doc, cb){
 	connect(remove,table,cb,doc);
};

dataBase.getOne = function (table, doc, cb){
 	connect(getOne,table,cb,doc);
};


module.exports = dataBase;