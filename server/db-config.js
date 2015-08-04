"use strict";

var pg             = require("pg");
var str            = process.env.POSTGRES_URI  || require("../credentials.json").postgres;
var url            = "postgres://" + str;
var stringifyData  = require("./lib/stringify-data-sql.js");
var stringifyUnits = require("./lib/stringify-units-sql.js").stringify;
var getQuery       = require("./lib/edit-query-sql.js").getQuery;
var queryStrings   = require("./lib/querys.js");
var command        = require("./lib/commands.js");
var dateRange      = require("./lib/searchDates.js");
var dataBase       = {};


function connect (query) {
    pg.connect(url, function(err, clt, done) {

        if (err) {
            console.log(err)
            return;
        }
        query( clt, done);
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
                .next()
                .select("job_number")
                .from("orders")
                .where("job_number = (select max(job_number) from orders)")
                .end();

    return query;
}



function editContacts (doc,clt,cb, done) {
    var query = getQuery.standard(doc);

    clt.query(command()
                .update("contacts")
                .set(query)
                .where("contact_id ="  + doc.contact_id)
                .end(), function (err) {

        done();

        if (err) {
            return cb(err);
        }
        cb(null);
    });
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
                .end() , [doc.username, doc.current_password, doc.new_password], function(err) {
        
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
                .end(), function(err) {

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
                .end(), function(err) {
        
        done();
        
        if (err) {
            return cb(err);
        }
        cb(null);
    });
}

function editReminders (doc, clt, cb, done) {

    var updateQuery = getQuery.update(doc, "reminderer", "reminder_id").update;
    var createQuery = getQuery.update(doc, "reminderer", "reminder_id").create;
    var deleteQuery = getQuery.del(doc.delete_invoice, "reminderer", "reminder_id");

    clt.query(command()
                .query(updateQuery)
                .query(deleteQuery)
                .query(createQuery)
                .end(), function (err) {
        
        done();
        
        if (err) {
            return cb(err);
        }
        cb(null);
    });
}

dataBase.get = function (table, cb) {

    connect( function (client, done) {
        var query;

        if (table === "contacts") {
            query = command()
                    .select('*')
                    .from('contacts')
                    .query(" left join reminderer on contacts.contact_id = reminderer.contact_reminders_id")
                    .end();

        } else if (table === "orders") {
            query = command()
                    .select("*")
                    .from(table)
                    .query("inner join invoice on order.job_number = invoice.job_number")
                    .end();
        } else {
            query = command()
                    .select("*")
                    .from(table)
                    .end();
        }

        client.query( query, function (err, result) {

            done();

            if (err) {
                return console.log(err);
            }

            cb(result.rows);
        });
    });
};

dataBase.getOrder = function (table, job_number, cb) {

    connect( function (client, done) {

        client.query(command()
                .select("*")
                .from(table)
                .where("job_number = " + job_number)
                .next()
                .select("*")
                .from("units")
                .where("job_number = " + job_number)
                .end(), function(err, result) {
            
            done();

            if (err) {
                return cb(err);
            }
            cb(null, result.rows);
        });
    });
};

dataBase.post = function (table, doc, cb) {

    connect( function (client, done) {

        var query;

        if (table === "users") {
            query = postUsers(table, doc);
        } else if (table === "orders"){
            query = postOrders(table, doc);
        } else {
            query = postContactsReminders(table, doc);
        }
        
        client.query(query, function (err, result) {
            done();

            if (err) {
                return cb(err);
            }
            cb(null, result);
        });
    });
};

dataBase.edit = function (table, doc, cb) {

    connect( function (client, done) {

        if (table === "users") {
            editUsers(doc, client, cb, done);
        } else if (table === "invoice") {
            editInvoices(doc, client, cb, done);
        } else if (table === 'contacts') {
            editContacts(doc, client, cb, done);
        } else if (table ==='reminderer') {
            editReminders(doc,client,cb,done)
        } else {
            editOrders(doc, client, cb, done);
        }
    });
};


dataBase.remove = function (table, doc, cb) {

    connect( function (client, done) {

        var column;

        column = table === "users" ? "username" : 
                table === "units" ? "unit_id" : 
                table === "reminders" ? "reminder_id" : 
                table === "contacts" ? "contact_id" : "job_number";

        client.query(command()
                    .deletes()
                    .from(table)
                    .where(column + " = $1")
                    .end(), [doc], function(err) {

            done();
            if (err) {
                return cb(err);
            }
            cb(null);
        });
    })
};

dataBase.selectUnits = function (table, job_number, cb ) { 

    connect( function (client, done) {

        client.query(command()
                .select("*")
                .from("units")
                .where("job_number = $1")
                .end(), [job_number], function (err, units) {

            done();

            if(err) {
                console.log(err);
                return;
            }
            cb(units.rows);
        });
    })
};

dataBase.getInvoices = function (table, job_number, cb ) {

    connect( function (client, done) {

        client.query(command()
                .select("*")
                .from("invoice")
                .where("job_number = $1")
                .end(), [job_number], function (err, units) {

            done();

            if(err) {
                return cb(err);
            }

            cb(null, units.rows);
        });
    })
};

dataBase.selectUser = function (username, password, remember, cb) {

    connect( function (client, done) {

        client.query(command()
                .select("*")
                .from("users")
                .where("username = $1 AND password = crypt($2, password)")
                .end(), [username, password], function(err, user) {

            done();

            if(err || user.rows.length !== 1) {
                var error = err ? err : "no user";
                cb(error);
            } else {
                cb(null, user.rows[0], remember);
            }
        });
    })
};



dataBase.searcher = function (table, data, cb) {

    connect( function (client, done) {

        var query;

        if (table === "orders") {
            query = queryStrings.searchOrders(data);
        } else {
            query = queryStrings.searchContacts(data);
        }

        client.query(query, function (err, result) {

            done();

            if (err || result.rows.length === 0) {
                var error = err ? err : true;
                return cb(error);
            }

            cb(null, result.rows);
        });
    })
};

dataBase.searchDates = function (table, dates, cb) {

    var query = dateRange(dates);
    
    connect( function (client, done) {

        if(dates === "" ||dates[0] === "" || dates[1] === ""){
            cb([]);
        }
        else{
            client.query(query, function (err,result) {

                    done();

                    if(err || result.rows.length ===0) {
                        var error = err ? err : true;
                        return cb(error);
                    }
                    cb(null,result.rows);
            });
        }
    })
};

module.exports = dataBase;
