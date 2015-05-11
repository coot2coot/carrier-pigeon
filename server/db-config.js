
var pg 		 	  = require("pg");
var str           = process.env.POSTGRES_URI || require("../credentials.json").postgres;
var url 	      = "postgres://"+ str + "/carrier-pigeon-dev"
var stringifyData = require("./lib/stringify-data-sql.js");
var stringifyUnits = require("./lib/stringify-units-sql.js");
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
    clt.query("SELECT * FROM " + table, function(err, result) {
        if (err) {
            console.log(err)

            done(clt);
            return;
         }

        done();
        console.log(result.rows)
        cb(result.rows);
    });
}

function getOrders (table, clt, done, cb) {
    clt.query("SELECT orders.*, number_of_units FROM orders LEFT JOIN (SELECT units.job_number AS unit_order_id,COUNT(units.job_number) AS number_of_units FROM Units GROUP BY units.job_number) AS units_count ON orders.job_number = unit_order_id;", function(err, result) {
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

    var orders,
        units,
        data;
        query;

    if(table === "users"){
        data = stringifyData(doc) 
        query = "INSERT into " + table + " (" + data.columns +", password) VALUES ('" + data.values +"', crypt('changeme', gen_salt('md5')))"
    } else{
       orders = stringifyData(doc.order)
        units = stringifyUnits(doc.unit) 
        query = "INSERT into orders (" + orders.columns + ") VALUES ('"+orders.values+"'); INSERT into units ("+ units.columns + ") VALUES ('" + units.values + "');"
    }

    clt.query(query, function(err, result) {
        if (err) {
            console.log(err)

            done(clt);
            return cb(err);
        }

        done();
        cb(null);
    });
}

function edit (table, clt, done, cb, doc) {

    if (table === 'users') {
        var updateUser = {
            first_name: doc.first_name,
            last_name: doc.last_name,
            invitation: true
        }

        var query = editQuery(updateUser);

        clt.query("UPDATE " + table + " SET " + query + ",password = crypt($3, gen_salt('md5')) WHERE username = $1 AND password = crypt($2, password)", [doc.username, doc.current_password, doc.new_password], function(err, result) {
            if (err) {
                console.log(err)

                done(clt);
                return;
            }
            done();
            cb();
        });
    } else {
        var ordersQuery = editQuery(doc.order);
        var unitsQuery = editQuery(doc.unit);

        clt.query("UPDATE orders SET " + ordersQuery + " WHERE " + " job_number= " +"'" + doc.order.job_number + "'; UPDATE units SET " + unitsQuery + " WHERE " + " job_number= " +"'" + doc.unit.job_number + "'", function(err, result) {
         if (err) {
            console.log('err >>>', err)

                done(clt);
                return;
            }

            done();
            cb();
        });
    }
}

function remove (table, clt, done, cb, doc) {
    var column;

    column = table === "users" ? "username" : "job_number"

    clt.query("DELETE FROM " + table + "  WHERE " + column + " = $1", [doc], function(err, user) {

        if (err) {
            console.log(err)
                if(!err) return false;

                done(clt);
                return;
            }

            done();
            cb()
        });

}

function selectUnits (table, clt, done, cb, job_number) {

    clt.query("SELECT * FROM units WHERE job_number = '" + job_number +"'", function(err, units) {

        if(err) {
            console.log(err);
            done();
            return;
        }
        console.log(units.rows);
        done();
        cb(units.rows);
    });
}


function getUser (table, clt, done, cb, username) {

    clt.query("SELECT * FROM " + table + " WHERE username = $1", [username], function(err, user) {

        if(err) {
            console.log(err);
            done();
            return;
        }
        done();
        
        if (user.rows[0]) {
            cb(null, user.rows[0]);
        } 
        else {
            cb(null, false,'Sorry, no usernames match that query');
        }
    });
}

function loginUser (table, clt, done, cb, username, password, remember) {
    clt.query("SELECT * FROM " + table + " WHERE username = $1 AND password = crypt($2, password)", [username, password], function(err, user) {

        if(err) {
            console.log(err);
            done();
            return;
        }
        done();

        if (user.rows[0]) {
            cb(null, user.rows[0], remember);
        } 
        else {
            cb(null, false, null,'Incorrect username or password combo');
        }
    });
}


dataBase.get = function (table, cb, test){
 	connect(get, table, cb, test)
};

dataBase.getOrders = function (table, cb, test){
    connect(getOrders, table, cb, test)
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


dataBase.selectUnits = function (table, job_number, cb , test){
    connect(selectUnits, table,cb, test, job_number)
};

dataBase.getUser = function (username, cb, test) {
   connect(getUser,"users",cb, test, username)
};

dataBase.selectUser = function (username, password, remember, cb, test) {
   connect(loginUser,"users",cb, test, username, password, remember)
};

module.exports = dataBase;