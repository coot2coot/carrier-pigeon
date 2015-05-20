var pg 		 	  = require("pg");
var command 	  = require("../server/lib/commands.js");
var client   	  = "postgres://qzdwpgfrviqmcu:1hJBjZXlz_8pjTb9qjPUTHiQao@ec2-107-20-159-103.compute-1.amazonaws.com:5432/d6dar9ohioh4dh?ssl=true";
var testDb 		  = {};


testDb.createOrder = function (test){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query(command()
        			.insertInto('orders ')
        			.columns('job_number, client, date ,loading_reference')
        			.values("3248, 'jeff', '10-10-2010' ,'123new'")
        			.next()
        			.insertInto('units')
        			.columns('unit_id, job_number, unit_number ,unit_type')
        			.values("2, 3248, 'j245ff', '40dd'")
        			.end(), function(err, result) {
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
                        console.log(result)
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

testDb.mockUnits = {
    unit_number: "345fgd",
    job_number: 1234,
    unit_type:"40dc"
}

testDb.mockOrders = {
	job_number: 1234,
	client : 'fake',
	date : '10-10-2010',
}

testDb.mockOrders2 = {
	job_number: 12567,
	client : 'fake',
	date : '10-10-2010',
}
testDb.mockOrdersUnits = {
    unit: testDb.mockUnits,
    order: testDb.mockOrders
}


module.exports = testDb;


