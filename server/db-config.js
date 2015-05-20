"use strict"

var pg 		 	   = require("pg");
var str            = process.env.POSTGRES_URI || require("../credentials.json").postgres;
var url 	       = "postgres://"+ str + "/carrier-pigeon-dev"
var stringifyData  = require("./lib/stringify-data-sql.js");
var stringifyUnits = require("./lib/stringify-units-sql.js");
var editQuery      = require("./lib/edit-query-sql.js");
var queryStrings   = require("./lib/querys.js");
var command        = require("./lib/commands");
var dataBase       = {};


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
    clt.query(command()
                .select("*")
                .from(table)
                .end(), function(err, result) {
        if (err) {
            console.log(err)

            done(clt);
            return;
         }

        done();
        cb(result.rows);
    });
}

function getOrder (table, clt, done, cb, job_number) {
    clt.query(command()
                .select("*")
                .from(table)
                .where("job_number = " + job_number)
                .end(), function(err, result) {
                    
        if (err) {
            done(clt);
            return cb(err);
         }

        done();
        cb(null, result.rows);
    });
}


function post (table, clt, done, cb, doc) {
    var data,
        orders,
        query,
        units;

    if (table === "users") {
        var columns = stringifyData(doc).columns +", password";
        var values = stringifyData(doc).values + ", crypt('changeme', gen_salt('md5'))";

        query = command()
                    .insertInto(table)
                    .columns(columns)
                    .values(values)
                    .end()
    } else {
        orders = stringifyData(doc.order)
        units = stringifyUnits(doc.unit)

        query = command()
                    .insertInto(table)
                    .columns(orders.columns)
                    .values(orders.values)
                    .next()
                    .insertInto('units')
                    .columns(units.columns)
                    .values(units.values)
                    .end()

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

        var query = editQuery.standard(updateUser);

        clt.query(command()
                    .update(users)
                    .set(query+ ",password = crypt($3, gen_salt('md5'))")
                    .where("username = $1 AND password = crypt($2, password)")
                    .end() , [doc.username, doc.current_password, doc.new_password], function(err, result) {
            if (err) {
                console.log(err)

                done(clt);
                return;
            }
            done();
            cb();
        });
    } else {
        var ordersQuery = editQuery.standard(doc.order);
        var unitsUpdateQuery = editQuery.units(doc.unit).update;
        var unitsCreateQuery = editQuery.units(doc.unit).create;
        var unitsDeleteQuery = editQuery.unitDelete(doc.unit_delete);

        clt.query(command()
                    .update("orders")
                    .set(ordersQuery)
                    .where("job_number = '" + doc.order.job_number+"'" )
                    .next()
                    .query(unitsUpdateQuery)
                    .query(unitsDeleteQuery)
                    .query(unitsCreateQuery)
                    .end(), function(err, result) {
            if (err) {
                console.log(err)

                done(clt);
                return;
            }

            done();
            cb(null);
        });
    }
}

function remove (table, clt, done, cb, doc) {

    var column;

    column = table === "users" ? "username" :table === "units" ? "unit_id" : "job_number"

    clt.query(command()
                .deletes()
                .from(table)
                .where(column + " = $1")
                .end(), [doc], function(err, user) {

        if (err) {
            console.log(err)
                if(!err) return false;

                done(clt);
                return;
            }

            done()
            cb(null)
        });
}


function selectUnits (table, clt, done, cb, job_number) {

    clt.query(command()
                .select("*")
                .from("units")
                .where("job_number = $1")
                .end(), [job_number], function(err, units) {

        if(err) {
            console.log(err);
            done();
            return;
        }
        done();
        cb(units.rows);
    });
}

function loginUser (table, clt, done, cb, username, password, remember) {
    clt.query(command()
                .select("*")
                .from(table)
                .where("username = $1 AND password = crypt($2, password)")
                .end(), [username, password], function(err, user) {

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

function search (table, clt, done, cb, value){
    var query = queryStrings.searchOrders(value);
    clt.query(query, function (err,result){
        if(err || result.rows.length ===0) {
            console.log(err);
            done();

            return cb(true);
        }
        done();

        cb(null,result.rows);

    })

}

function searchDates (table, clt, done, cb, dates){
    if(dates === "" ||dates[0] === "" || dates[1] === ""){
        cb([]);
    }
    else{
        clt.query(command()
                    .select("*")
                    .from(table)
                    .where("date >='" + dates[0] + "' AND date <='"+dates[1] + "'")
                    .end(), function (err,result){
                        if(err || result.rows.length ===0) {
                            console.log(err);
                            done();

                            return cb(true);
                        }
                        done();

                        cb(null,result.rows);

        })
    }
}


dataBase.get = function (table, cb, test){
 	connect(get, table, cb, test)
};

dataBase.getOrder = function (table, id, cb, test){
    connect(getOrder, table, cb, test, id)
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

dataBase.selectUser = function (username, password, remember, cb, test) {
   connect(loginUser,"users",cb, test, username, password, remember)
};

dataBase.searcher = function (table, data, cb, test) {
    connect(search, table,cb,test,data)
};
dataBase.searchDates = function (table, data, cb, test) {
    connect(searchDates, table,cb,test,data)
};

module.exports = dataBase;
