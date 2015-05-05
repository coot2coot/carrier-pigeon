var pg 		 	  = require("pg");
var client   	  = "postgres://qzdwpgfrviqmcu:1hJBjZXlz_8pjTb9qjPUTHiQao@ec2-107-20-159-103.compute-1.amazonaws.com:5432/d6dar9ohioh4dh?ssl=true";
var testDb 		  = {};


testDb.createOrder = function (table, test){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("INSERT INTO " + table + " (job_number,unit_type, client, date , vendor , loading_reference )" + " VALUES " + "('$12567','44d', 'jeff', '10-10-2010' , 'new' , '123new' )", function(err, result) {
		    if (err) {
		    	console.log('err >>>', err)
	            if(!err) return false;

	            done(clt);
		    	return;
		    }
		    done();
            test(table);
		});
    });
};

testDb.clearTable = function (table){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

        clt.query("DELETE FROM " + table, function(err, result) {
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


testDb.mockObject = {
	job_number: '$1234',
	unit_type: 'play',
	unit_quantity: '4',
	client : 'fake',
	date : '10-10-2010',
}

testDb.mockObject2 = {
	job_number: '$12567',
	unit_type: 'edited',
	client : 'fake',
	date : '10-10-2010',
}


module.exports = testDb;


