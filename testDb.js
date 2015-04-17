var sqlFixtures   = require("sql-fixtures");
var pg 		 	  = require("pg");
var client   	  = "postgres://@localhost:5432/testdb";

var dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'testdb',
    port: 5432
  }
};

var dataSpec = {
  users: {
    username: 'Bob',
    email: 'bob@example.com'
  }
};

var create = function () {
	sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
		if(err){
			console.error(err)
		}
		if(result){
			console.log(result);
		}
	});
};

var createTable = function (cb){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("CREATE TABLE USERS (job text NOT NULL PRIMARY KEY,username text, email text)", function(err, result) {
		    if (err) {
		    	console.log('err >>>', err)
	            if(!err) return false;

	            done(clt);
		    	return;
		    }

            done();
		    cb();
		});
    });
};

createTable(create);
