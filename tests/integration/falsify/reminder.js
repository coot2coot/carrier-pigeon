
var pg 		 	  = require("pg");
var command 	  = require("../../../server/lib/commands.js");
var strng 		  = process.env.POSTGRES_URI  || require("../../../credentials.json").postgres;
var client   	  = "postgres://" + strng;
var mock 		  = require("../mocks/reminders.js")
var testDb 		  = {};


testDb.create= function (test){
	pg.connect(client, function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return
    	}

	    clt.query(command()
        			.insertInto('reminders')
        			.columns('contact,date,quote')
        			.values("'dave','10-10-2015', 'potential sale'")
        			.next()
        			.select("reminder_id")
        			.from('reminders ORDER BY reminder_id DESC LIMIT 1')
        			.end(), function(err, result) {

        	mock.edit.reminder_id = result.rows[0].reminder_id.toString();

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