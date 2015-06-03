"use strict";

// Lint!
// better error handling
// use === not ==

var pg             = require("pg");
var str            = process.env.POSTGRES_URI  || require("../credentials.json").postgres;
var url            = "postgres://" + str;
var stringifyData  = require("./lib/stringify-data-sql.js");
var stringifyUnits = require("./lib/stringify-units-sql.js").stringify;
var getQuery      = require("./lib/edit-query-sql.js").getQuery;
var queryStrings   = require("./lib/querys.js");
var command        = require("./lib/commands");
var dataBase       = {};



function connect (query, table, cb, var1, var2, var3) {
    pg.connect(url, function(err, clt, done) {

        if (err) {
            cb(err);
            return;
        }

        query(table, clt, done, cb, var1, var2, var3);
    });
}


function get (table, clt, done, cb) {
    var query;

    if (table === "contacts") {
        query = command()
                    .select('*')
                    .from(table)
                    .order("name")
                    .end();
    } else {
        query = command()
                    .select("*")
                    .from(table)
                    .end();
    }
    clt.query(query, function(err, result) {
        if (err) {
            console.log(err);

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
                .next()
                .select("*")
                .from("units")
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
        query;

    if (table === "users") {
        query = postUsers(table,doc)
    } else if (table === "orders"){
        query = postOrders(table,doc);
    } else {
        query = postContactsReminders(table,doc)
    }
    
    clt.query(query, function(err, result) {
        if (err) {
            done(clt);
            return cb(err);
        }

        done();
        cb(null);
    });
}

function postUsers (table, doc) {
    var columns = stringifyData(doc).columns +", password";
    var values  = stringifyData(doc).values + ", crypt('changeme', gen_salt('md5'))";

    var query = command()
                .insertInto(table)
                .columns(columns)
                .values(values)
                .end();

    return query;
}

function postContactsReminders (table, doc) {
    var contacts = stringifyData(doc);
    var query = command()
                .insertInto(table)
                .columns(contacts.columns)
                .values(contacts.values)
                .end();

    return query;
}

function postOrders (table, doc) {
    var orders = stringifyData(doc.order);
    var units   = stringifyUnits(doc.unit);

    var query = command()
                .insertInto(table)
                .columns(orders.columns)
                .values(orders.values)
                .next()
                .insertInto('units')
                .columns(units.columns)
                .values(units.values)
                .end();

    return query;
}


function edit (table, clt, done, cb, doc) {

    if (table === "users") {
        editUsers(doc,clt,cb, done);
    } else if (table === "invoice") {
        editInvoices(doc, clt, cb, done);
    } else if (table === 'contacts') {
        editContacts(doc,clt,cb,done)
    } else if (table ==='reminders') {
        editReminders(doc,clt,cb,done)
    } else {
        editOrders(doc,clt,cb, done);
    }
}

function editContacts (doc,clt,cb, done) {
    var query = getQuery.standard(doc);

    clt.query(command()
                .update("contacts")
                .set(query)
                .where("contact_id ="  + doc.contact_id)
                .end(), function(err, result) {

        done();

        if (err) {
            return cb(err);
        }
        cb(null);
    });
}

function editReminders (doc,clt,cb, done) {
    var query = editQuery.standard(doc);
    console.log(query);

    clt.query(command()
                .update("reminders")
                .set(query)
                .where("reminder_id ="  + doc.reminder_id)
                .end(), function(err, result) {

        done();

        if (err) {
            return console.log(err);
        }
        cb(null);
    })
}
function editUsers (doc,clt,cb, done) {
    var updateUser = {
        first_name: doc.first_name,
        last_name: doc.last_name,
        invitation: true
    };

    var query = getQuery.standard(updateUser);

    clt.query(command()
                .update("users")
                .set(query+ ",password = crypt($3, gen_salt('md5'))")
                .where("username = $1 AND password = crypt($2, password)")
                .end() , [doc.username, doc.current_password, doc.new_password], function(err, result) {
        
        done();
        if (err) {
            return cb(err);
        }
        cb(null);
    });
}

function editOrders (doc,clt,cb, done) {

    var ordersQuery = getQuery.standard(doc.order);
    var unitsUpdateQuery = getQuery.update(doc.unit, "units", "unit_id").update;
    var unitsCreateQuery = getQuery.update(doc.unit, "units", "unit_id").create;
    var unitsDeleteQuery = getQuery.del(doc.unit_delete, "units", "unit_id");

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
            done(clt);
            return cb(err);
        }

        done();
        cb(null);
    });
}

function editInvoices (doc, clt, cb, done) {

    var updateQuery = getQuery.update(doc, "invoice", "invoice_id").update;
    var createQuery = getQuery.update(doc, "invoice", "invoice_id").create;
    var deleteQuery = getQuery.del(doc.delete_invoice, "invoice", "invoice_id");

    clt.query(command()
                .query(updateQuery)
                .query(deleteQuery)
                .query(createQuery)
                .end(), function(err, result) {
        
        done();
        
        if (err) {
            return cb(err);
        }
       
        cb(null);
    });
}


function remove (table, clt, done, cb, doc) {

    var column;

    column = table === "users" ? "username" : 
            table === "units" ? "unit_id" : 
            table === "reminders" ? "reminder_id" : 
            table === "contacts" ? "contact_id" : "job_number";

    clt.query(command()
                .deletes()
                .from(table)
                .where(column + " = $1")
                .end(), [doc], function(err, user) {

        done();

        if (err) {
            return cb(err);
        }
        cb(null);
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

function getInvoices(table, clt, done, cb, job_number) {
    clt.query(command()
                .select("*")
                .from("invoice")
                .where("job_number = $1")
                .end(), [job_number], function(err, units) {

        done();

        if(err) {
            return cb(err);
        }

        cb(null, units.rows);
    });
}

function loginUser (table, clt, done, cb, username, password, remember) {
    clt.query(command()
                .select("*")
                .from(table)
                .where("username = $1 AND password = crypt($2, password)")
                .end(), [username, password], function(err, user) {

        done();

        if(err || user.rows.length != 1) {
            var error = err ? err : "no user";
            cb(error);
        } else {
            cb(null, user.rows[0], remember);
        }
    });
}

function search (table, clt, done, cb, value){
    var query;

    if(table === "orders"){
        query = queryStrings.searchOrders(value);
    } else {
        query = queryStrings.searchContacts(value);
    }

    clt.query(query, function (err,result){
        
        done();

        if(err || result.rows.length ===0) {
            var error = err ? err : true;
            return cb(error);
        }

        cb(null, result.rows);
    });
}

function searchDates (table, clt, done, cb, dates){
    if(dates === "" ||dates[0] === "" || dates[1] === ""){
        cb([]);
    }
    else{
        clt.query(command()
            .select("*")
            .from(table)
            .where("ets >='" + dates[0] + "' AND ets <='"+dates[1] + "'")
            .end(), function (err,result){

                done();

                if(err || result.rows.length ===0) {
                    var error = err ? err : true;
                    return cb(error);
                }

                cb(null,result.rows);
        });
    }
}



dataBase.get = function (table, cb){
    connect(get, table, cb);
};

dataBase.getOrder = function (table, id, cb){
    connect(getOrder, table, cb, id);
};

dataBase.post = function (table, doc, cb){
    connect(post, table, cb, doc);
};

dataBase.edit = function (table, doc, cb){
    connect(edit, table, cb, doc);
};
dataBase.remove = function (table, doc, cb){
    connect(remove,table,cb, doc);
};

dataBase.selectUnits = function (table, job_number, cb ){
    connect(selectUnits, table,cb, job_number);
};

dataBase.getInvoices = function (table, job_number, cb ){
    connect(getInvoices, table,cb, job_number);
};

dataBase.selectUser = function (username, password, remember, cb) {
   connect(loginUser,"users",cb, username, password, remember);
};

dataBase.searcher = function (table, data, cb) {
    connect(search, table,cb,data);
};
dataBase.searchDates = function (table, data, cb) {
    connect(searchDates, table,cb,data);
};

module.exports = dataBase;
