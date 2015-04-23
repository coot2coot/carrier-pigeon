var pg 		 	  = require("pg");
var client   	  = "postgres://qzdwpgfrviqmcu:1hJBjZXlz_8pjTb9qjPUTHiQao@ec2-107-20-159-103.compute-1.amazonaws.com:5432/d6dar9ohioh4dh?ssl=true";
var testDb 		  = {};

function addValues (table){
    clt.query("INSERT INTO " + table + " (job_number,unit_type, client, date , vendor , loading_reference )" + " VALUES " + "(1234,'44d', 'jeff', '10-10-2010' , 'new' , '123new' )", function(err, result) {
		if (err) {
		 console.log('err >>>', err)
	        if(!err) return false;

	        done(clt);
		  eturn;
		}

        done();
    });
};

testDb.createTable = function (table){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("CREATE TABLE " + table + " (job_number integer NOT NULL PRIMARY KEY,unit_type text, client text, date date, vendor text, loading_reference text)", function(err, result) {
		    if (err) {
		    	console.log('err >>>', err)
	            if(!err) return false;

	            done(clt);
		    	return;
		    }

            addValues(table, clt, done)
		});
    });
};

testDb.deleteTable = function (table){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("DROP TABLE " + table, function(err, result) {
		    if (err) {
		    	console.log('err >>>', err)
	            if(!err) return false;

	            done(clt);
		    	return;
		    }

            done();
		});
    });
};

module.exports = testDb;
