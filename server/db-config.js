
var pg 		 	  = require("pg");
var str      = process.env.POSTGRES_URI || require("../credentials.json").postgres;
var url 	= "postgres://"+ str + "/carrier-pigeon-dev"
var stringifyData = require("./lib/stringify-data-sql.js");
var editQuery     = require("./lib/edit-query-sql.js");
var dataBase      = {};


function tests (test){
	if(test){
		return test;
	}else{
		return url;
	}
}

function connect (query, table, cb, test, var1, var2, var3) {

	pg.connect(tests(test), function(err, clt, done) {

    	if (err) {
    		console.log(err)
            return;
    	}

        query(table, clt, done, cb, var1, var2, var3)
    });
}

function get (table, clt, done, cb) {
    clt.query("SELECT * FROM "+ table +" ORDER by date", function(err, result) {
        if (err) {
            console.log('err >>>', err)

            done(clt);
            return;
         }

        done();
        cb(result.rows);
    });
}

function post (table, clt, done, cb, doc) {
    var data = stringifyData(doc);
    clt.query("INSERT into " + table + " (" + data.columns +") VALUES ('" + data.values +"')", function(err, result) {
        if (err) {
            console.log('err >>>', err)

            done(clt);
            return;
        }

        done();
        cb();
    });
}

function edit (table, clt, done, cb, doc) {
    var query = editQuery(doc);
    console.log(doc)

    clt.query("UPDATE " + table + " SET " + query + " WHERE " + " job_number= " +"'" + doc.job_number + "'", function(err, result) {
        if (err) {
            console.log('err >>>', err)

            done(clt);
            return;
        }

        done();
        cb();
    });
}

function remove (table, clt, done, cb, doc) {
    clt.query("DELETE FROM " + table + "  WHERE job_number = $1", [doc], function(err, user) {

        if (err) {
            console.log('err >>>', err)
                if(!err) return false;

                done(clt);
                return;
            }

            done();
            cb()
        });

}

function selectUser (table, clt, done, cb, username, password, remember) {

    clt.query("SELECT * FROM " + table + " WHERE username = $1", [username], function(err, user) {

        if(err) {
            console.log(err);
            done();
            return;
        }
        done();

        if (user.rows[0] && user.rows[0].password === password) {
            cb(null, user.rows[0], remember);
        } 
        else {
            cb(null, false, null,'Incorrect username or password combo');
        }
    });
}



dataBase.get = function (table, cb, test){
    console.log(table);
 	connect(get, table, cb, test)
};

dataBase.post = function (table, doc, cb, test){
	connect(post, table, cb, test, doc)
};

dataBase.edit = function (table, doc, cb, test){
    connect(edit, table, cb, test, doc);
};
dataBase.remove = function (table, doc, cb, test){
    connect(remove,table,cb,test, doc)
};

dataBase.selectUser = function (username, password, remember, cb, test) {
   connect(selectUser,"users",cb, test, username, password, remember)
};





module.exports = dataBase;