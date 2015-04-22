var pg 		 	  = require("pg");
var str      	  = process.env.POSTGRES_URI || require("../credentials.json").postgres;
var stringifyData = require("./lib/stringify-data-sql.js");
var dataBase 	  = {};


dataBase.get = function (table, cb){
 	pg.connect("postgres://"+ str + "/carrier-pigeon-dev", function(err, clt, done) {
    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("SELECT * FROM "+ table +" ORDER by date", function(err, result) {
		    if (err) {
		    	console.log(err)
	            return done(clt);
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
		    	console.log(err)
	            done(clt);
		    	return;
		    }

            done();
		    cb();
		});
    });
};

dataBase.update = function (table, doc, cb){
	var data = stringifyData(doc);

	pg.connect("postgres://"+ str + "/carrier-pigeon-dev", function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("UPDATE " + table + " SET invoice = " + doc.invoice +" WHERE " + " job_number= " +"'" + doc.job_number + "'", function(err, result) {
		    if (err) {
		    	console.log(err)
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

        clt.query('SELECT * FROM users WHERE user_name = $1', [username], function(err, user) {
            if (err) {
            	console.log(err);
            	return done(clt);
            }

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
		    	console.log(err)
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