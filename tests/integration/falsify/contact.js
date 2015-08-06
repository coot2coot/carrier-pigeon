var pg 		 	  = require("pg");
var command 	  = require("../../../server/lib/commands.js");
var strng 		  = process.env.POSTGRES_URI  || require("../../../credentials.json").postgres;
var client   	  = "postgres://" + strng;
var mock 		  = require("../mocks/contacts.js")
var testDb 		  = {};


testDb.create= function (cb){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

	    clt.query(command()
        			.insertInto('contacts')
        			.columns('vat_number,city ,telephone')
        			.values("'as9d87f', 'paris' ,'0789287349'")
        			.next()
        			.select("contact_id")
        			.from('contacts ORDER BY contact_id DESC LIMIT 1')
        			.end(), function (err, result) {

            cb(result)

        	mock.edit.contact_id = result.rows[0].contact_id.toString();

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

