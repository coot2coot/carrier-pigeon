"use strict";

var pg             = require("pg");
var str            = process.env.POSTGRES_URI  || require("../credentials.json").postgres;
var url            = "postgres://" + str;
var stringifyData  = require("./lib/stringify-data-sql.js");
var stringifyUnits = require("./lib/stringify-data-multiple-rows-sql.js").stringifyMultiple;
var getQuery       = require("./lib/edit-query-sql.js").getQuery;
var queryStrings   = require("./lib/querys.js");
var command        = require("./lib/commands.js");
var dateRange      = require("./lib/searchDates.js");
var dataBase       = {};

function connect (query) {

    pg.connect(url, function (err, clt, done) {

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

function postContacts (table, doc) {

    var contacts = stringifyData(doc.singleValueObject);
    var people_contacts  = stringifyUnits(doc.multipleValuesObject2, 'telephone', 'contact_id');
    var query  = "";

    // Have reminders been added? check to see if the reminders
    // message property exists
    if (doc.multipleValuesObject.hasOwnProperty('message')) {

        var reminders       = stringifyUnits(doc.multipleValuesObject, 'date', 'contact_reminders_id');

        query = command()
                    .insertInto(table)
                    .columns(contacts.columns)
                    .values(contacts.values)
                    .next()
                    .insertInto('reminders')
                    .columns(reminders.columns)
                    .values(reminders.values)
                    .next()
                    .insertInto('people_contacts')
                    .columns(people_contacts.columns)
                    .values(people_contacts.values)
                    .end();
    } else {
        query = command()
                    .insertInto(table)
                    .columns(contacts.columns)
                    .values(contacts.values)
                    .next()
                    .insertInto('people_contacts')
                    .columns(people_contacts.columns)
                    .values(people_contacts.values)
                    .end();
    }

    return query;
}

function postOrders (table, doc) {

    var orders = stringifyData(doc.singleValueObject);
    var units   = stringifyUnits(doc.multipleValuesObject, 'unit_type', 'job_number');

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



function editContacts (doc, clt, cb, done) {

    var query = getQuery.standard(doc.singleValueObject);

    clt.query(command()
                .update("contacts")
                .set(query)
                .where("contact_id ="  + doc.singleValueObject.contact_id)
                .end(), function (err) {

        if (err) {
            return cb(err);
        }

        editReminders(doc, clt, cb, done)

    });
}

function editUsers (doc, clt, cb, done) {

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

function editOrders (doc, clt, cb, done) {

    var ordersQuery = getQuery.standard(doc.singleValueObject);
    var unitsUpdateQuery = getQuery.update(doc.multipleValuesObject, "units", "unit_id").update;
    var unitsCreateQuery = getQuery.update(doc.multipleValuesObject, "units", "unit_id").create;
    var unitsDeleteQuery = getQuery.del(doc.unit_delete, "units", "unit_id");

    clt.query(command()
                .update("orders")
                .set(ordersQuery)
                .where("job_number = '" + doc.singleValueObject.job_number+"'" )
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
    var deleteQuery = getQuery.del(doc.items_to_remove, "invoice", "invoice_id");

    clt.query(command()
                .query(updateQuery)
                .query(deleteQuery)
                .query(createQuery)
                .end(), function (err, result) {

        done();

        if (err) {
            return cb(err);
        }
        cb(null, result);
    });
}

function editReminders (doc, clt, cb, done) {

    var deleteQuery = getQuery.del(doc.remindersRemove, "reminders", "reminder_id");
    var query = '';

    if (doc.multipleValuesObject.hasOwnProperty('message')) {

        var updateQuery = getQuery.update(doc.multipleValuesObject, "reminders", "reminder_id").update;
        var createQuery = getQuery.update(doc.multipleValuesObject, "reminders", "reminder_id").create;
        query = command()
                    .query(updateQuery)
                    .query(deleteQuery)
                    .query(createQuery)
                    .end();
    } else {
        query = command()
                    .query(deleteQuery)
                    .end();

    }


    clt.query( query, function (err) {

        done();

        if (err) {
            return console.log(err);
        }

        editPeopleContacts(doc, clt, cb, done)
    });
}

function editPeopleContacts (doc, clt, cb, done) {

    var deleteQuery = getQuery.del(doc.pContactsRemove, "people_contacts", "people_contact_id");
    var query = '';

    var updateQuery = getQuery.update(doc.multipleValuesObject2, "people_contacts", "people_contact_id").update;
    var createQuery = getQuery.update(doc.multipleValuesObject2, "people_contacts", "people_contact_id").create;

    query = command()
                .query(updateQuery)
                .query(deleteQuery)
                .query(createQuery)
                .end();

    clt.query( query, function (err) {

            done();

            if (err) {
                return console.log(err);
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
                    .query(" left join reminders on contacts.contact_id = reminders.contact_reminders_id")
                    .end();

        } else if (table === "orders") {
            query = command()
                    .select("*")
                    .from(table)
                    .query(" inner join invoice on orders.job_number = invoice.job_number")
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
            query = postContacts(table, doc);
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


dataBase.editUserPermissions = function (username, details, cb) {

    connect(function (client, done) {

        var query = getQuery.standard(details);

        client.query(command()
                    .update("users")
                    .set(query)
                    .where("username = $1")
                    .end(), [username], function(err, result) {

            done();

            if (err) {
                return cb(err);
            }
            cb(null);
        });
    });
};


dataBase.edit = function (table, doc, cb) {

    connect(function (client, done) {

        if (table === "users") {
            editUsers(doc, client, cb, done);
        } else if (table === "invoice") {
            editInvoices(doc, client, cb, done);
        } else if (table === 'contacts') {
            editContacts(doc, client, cb, done);
        } else if (table ==='reminders') {
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
                table === "reminders" ? "contact_reminders_id" :
                table === "contacts" ? "contact_id" : "job_number";

        client.query(command()
                    .deletes()
                    .from(table)
                    .where(column + " = $1")
                    .end(), [doc], function (err) {

            done();
            if (err) {
                return cb(err);
            }
            cb(null);
        });
    })
};

dataBase.clearFileName = function (table, doc, cb) {

    connect( function (client, done) {

        client.query(command()
                .update(table)
                .set("file_name = '" + doc.files + "'")
                .where("job_number ="  + doc.id)
                .end(), function (err) {

            done();
            if (err) {

                return cb(err);
            }
            cb(null);
        });
    })
};

dataBase.select = function (table, id, cb ) {

    var idType = table === 'units' ? 'job_number' : 'contact_id';

    connect( function (client, done) {

        client.query(command()
                .select("*")
                .from(table)
                .where(idType + " = $1")
                .end(), [id], function (err, result) {

            done();

            if(err) {
                console.log(err);
                return;
            }
            cb(result.rows);
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
                .end(), [username, password], function (err, user) {

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
    });
};

dataBase.searchDates = function (table, dates, cb) {

    var query;

    if (table === "orders") {
      query = "SELECT * FROM orders WHERE date >='" + dates[0] + "' AND date <='" + dates[1] + "';";
    } else {
      query = dateRange(dates);
    }

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
    });
};

module.exports = dataBase;
