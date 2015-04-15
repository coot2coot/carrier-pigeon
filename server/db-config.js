var pg 		 	  = require("pg");
var str      = process.env.POSTGRES_URI || require("../credentials.json").postgres;
var client   	  = new pg.Client("postgres://"+ str + "/carrier-pigeon-dev");
var stringifyData = require("./lib/stringify-data-sql.js");
var dataBase 	  = {};

client.on('drain', client.end.bind(client));



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
 	pg.connect("postgres://"+ str + "/carrier-pigeon-dev", function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("SELECT * FROM "+ table +" ORDER by date", function(err, result) {
		    if (err) {
		    	console.log('err >>>', err)

	            done(clt);
		    	return;
		    }

            done();
		    cb(result.rows);
		});
    });
};

dataBase.post = function (table, doc, cb){
	var data = stringifyData(doc);

	pg.connect("postgres://"+ str + "/carrier-pigeon-dev", function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("INSERT into " + table + " (" + data.columns +") VALUES ('" + data.values +"')", function(err, result) {
		    if (err) {
		    	console.log('err >>>', err)

	            done(clt);
		    	return;
		    }

            done();
		    cb();
		});
    });
};

dataBase.selectUser = function (username, password, remember, cb) {
    pg.connect("postgres://"+ str + "/carrier-pigeon-dev", function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}
        var handleError = function(err) {
            if(!err) return false;

            done(clt);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

        clt.query('SELECT * FROM users WHERE user_name = $1', [username], function(err, user) {

            if(handleError(err)) return;

            done();

            if (user.rows[0] && user.rows[0].password === password) {
                cb(null, user.rows[0], remember);
            } 
            else {
                cb(null, false, null,'Incorrect username or password combo');
            }
        });
    });
};

dataBase.remove = function (table, doc, cb){
	console.log(doc, doc.job_number);
 	pg.connect("postgres://"+ str + "/carrier-pigeon-dev", function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query('DELETE FROM orders WHERE job_number = $1', [doc], function(err, user) {

            if (err) {
		    	console.log('err >>>', err)
	            if(!err) return false;

	            done(clt);
		    	return;
		    }

            done();
            cb()
        });
    });
};

dataBase.getOne = function (table, doc, cb){
 	connect(getOne,table,cb,doc);
};


module.exports = dataBase;