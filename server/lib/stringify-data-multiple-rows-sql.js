"use strict";
var stringify = require('./stringify-data-sql.js');

function hasId (id) {

    if (id === 'job_number') {
        return "(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)";
    } else {
        return "(SELECT contact_id FROM contacts ORDER BY contact_id DESC LIMIT 1)";
    }
}

function stringifyOneUnit (object, id) {

    var data;

    var idString = hasId(id);

    data = stringify(object);

    data.columns += ',' + id;

    var str = data.values + ',' + idString;

    data.values = str;
    return data;
}

function getColumns (object, id) {

    var props,
        arr = [],
        str = "";

    for (props in object) {
        arr.push(props);
    }

    arr.push(id)
    str = arr.join();

    return str;
}

function getValues (object, prop, id) {

    var values = [],
        length = object[prop].length,
        i;

    for (i = 0; i < length; i ++) {
        var props,
            arr = [],
            str = "";
              
        for(props in object) {
            if (typeof object[props] === "object") {

                var propValue = "'" + object[props][i] + "'";
                
                if (propValue === "''") {
                    propValue = "null";
                }

                arr.push(propValue);
            }
        }

        var getIdQuery = hasId(id);
        console.log('new', getIdQuery)

        str += arr.join() + "," + getIdQuery;
        values.push(str);
        arr = [];
    }
    return values.join('),(');
}

function stringifyMultiple (units, prop, id) {

    var data = {};

    if (typeof units[prop] === "object") {
        data.columns = "";
        data.values = "";

        var valueStr = getValues(units, prop, id);

        data.columns = getColumns(units, id);
        data.values = valueStr;

        return data;
        
    } else {
        return stringifyOneUnit(units, id);
    }
}

module.exports = {
    stringifyMultiple: stringifyMultiple,
    values: getValues,
    columns: getColumns,
    hasId: hasId
}

