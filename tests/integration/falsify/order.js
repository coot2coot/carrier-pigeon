var pg 		 	  = require("pg");
var command 	  = require("../../../server/lib/commands.js");
var strng 		  = process.env.POSTGRES_URI  || require("../../../credentials.json").postgres;
var client   	  = "postgres://" + strng
var mock   	  	  =  require("../mocks/orders-units.js");
var testDb 		  = {};


testDb.create = function (cb){
	pg.connect(client, function (err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query(command()
        			.insertInto('orders ')
        			.columns('client, date ,special_instructions')
        			.values("'jeff', '10-10-2010' ,'123new'")
        			.next()
        			.insertInto('units')
        			.columns(' job_number, unit_number ,unit_type')
        			.values(" (SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1),'guns758', '40dd'")
        			.next()
        			.select("job_number")
        			.from('orders ORDER BY job_number DESC LIMIT 1')
        			.next()
        			.select("unit_id")
        			.from('units ORDER BY unit_id DESC LIMIT 1')
        			.end(), function(err, result) {

            cb(result);
        	// The job number anf unit_id created in the query is being saved with in the mock object so that it can be reused in the tests.
        	mock.job_number = result.rows[0].job_number.toString();
        	mock.unit_id = result.rows[1].unit_id.toString();
		    if (err) {
		    	console.log('err >>>', err);
	            if(!err) return false;

	            done(clt);
		    	return;
		    }
		    done();
		});
    });
};

module.exports = testDb;
