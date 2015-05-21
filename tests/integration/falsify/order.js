var pg 		 	  = require("pg");
var command 	  = require("../../../server/lib/commands.js");
var strng 		  = process.env.POSTGRES_URI  || require("../../../credentials.json").postgres;
var client   	  = "postgres://" + strng
var mock   	  	  =  require("../mocks/orders-units.js");
var testDb 		  = {};


testDb.createOrder = function (test){
	pg.connect(client, function(err, clt, done) {

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

        	// The job number anf unit_id created in the query is being saved with in the mock object so that it can be reused in the tests.

        	mock.ordersUnitsEdit.order.job_number = result.rows[0].job_number.toString();
        	mock.ordersUnitsEdit.unit.unit_id = result.rows[1].unit_id.toString();
		    if (err) {
		    	console.log('err >>>', err)
	            if(!err) return false;

	            done(clt);
		    	return;
		    }
		    done();
            test();
		});
    });
};

testDb.clearTable = function (){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query(command()
        			.truncate('orders')
                    .end(), function(err, result) {
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
