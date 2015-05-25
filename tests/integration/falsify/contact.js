var pg 		 	  = require("pg");
var command 	  = require("../../../server/lib/commands.js");
var strng 		  = process.env.POSTGRES_URI  || require("../../../credentials.json").postgres;
var client   	  = "postgres://" + strng
var testDb 		  = {};


testDb.create= function (test){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

	    clt.query(command()
        			.insertInto('contacts')
        			.columns('vat_number,city ,telephone')
        			.values("'as9d87f', 'paris' ,'0789287349'")
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


module.exports = testDb;

