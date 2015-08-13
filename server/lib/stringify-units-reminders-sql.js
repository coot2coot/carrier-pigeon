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
    var id = hasId(id);

    data = stringify(object);
    var str = data.values.slice(0, -2) + id;

    data.values = str;
    return data;
}

function getColumns (object) {

    var props,
        arr = [],
        str = "";

    for (props in object) {
        arr.push(props);
    }

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
            if (typeof object[props] === "object" && props !== 'contact_reminders_id') {

                console.log(props)
                var propValue = "'" + object[props][i] + "'";
                
                if (propValue === "''") {
                    propValue = "null";
                }

                arr.push(propValue);
            }
        }

        var getIdQuery = hasId(id);

        str += "(" + arr.join() + "," + getIdQuery + ")";
        values.push(str);
        arr = [];
        console.log('values', values.join())
    }
    return values.join();
}

function stringifyUnitReminder (units, prop, id) {

    var data = {};

    if (typeof units[prop] === "object") {
        data.columns = "";
        data.values = "";

        var valueStr = getValues(units, prop, id);

        data.columns = getColumns(units);
        data.values = valueStr;

        if (id === 'job_number') data.values = valueStr.substring(1, valueStr.length-1);

        return data;
        
    } else {
        return stringifyOneUnit(units, id);
    }
}

module.exports = {
    stringify: stringifyUnitReminder,
    values: getValues,
    columns: getColumns,
    hasId: hasId
}

