"use strict";
var query = {};

query.invoice = function (invoices){
    var i;
    var query = {
        update: "",
        create: ""
    };

    console.log(invoices)

    if(typeof invoices.currency ==="object"){
        for(i = 0; i < invoices.currency.length; i ++){
            
            var props,
                updateArr = [];

            if(invoices.invoice_id[i] !== ""){
                for (props in invoices) {
                    if (props !== "invoice_id" && props !== "job_number") {
                        var value = "'" + invoices[props][i] + "'";

                        if (invoices[props][i] === "") {
                            value = "null";
                        }
                        var updateStr = props + "=" + value;
                        updateArr.push(updateStr);
                    }
                }
                query.update += "UPDATE invoice SET " + updateArr.join() + 
                            " WHERE invoice_id=" + invoices.invoice_id[i] + "; ";
            } else {
                var data = {};
                data.columns = [];
                data.values = [];
                for (props in invoices) {
                    if (props !== "invoice_id" && props !== "job_number") {
                        data.columns.push(props);
                        var value = "'" + invoices[props][i] + "'";
                        if (invoices[props][i] === "") {
                            value = "null";
                        }
                        data.values.push(value);
                    }
                }

                query.create += "INSERT INTO invoice (" + data.columns.join() +
                                ",job_number) VALUES (" + data.values.join() + "," + 
                                invoices.job_number + "); ";
            }
        }
    } else {
        var updateArr = [],
            updateStr = "";

        for (props in invoices) {
            if (props !== "invoice_id" && props !== "job_number") {
                var value = "'" + invoices[props] + "'";

                if (invoices[props] === "") {
                    value = "null";
                }
                var updateStr = props + "=" + value;
                updateArr.push(updateStr);
            }
        }
        query.update += "UPDATE invoices SET " + updateArr.join() + 
                    " WHERE invoice_id=" + invoices.invoice_id + "; ";
    }
    return query;
}

query.invoiceDelete = function (invoices) {
    if (invoices !== ""){
        var arr = invoices.split(",")
        var deleteQuery = "";
        var i;

        for(i = 0; i < arr.length; i++){
            deleteQuery += "DELETE FROM invoices WHERE invoice_id = "+arr[i]+";"
        }
        return deleteQuery
    }else{
        return "";
    }

}


module.exports = {
    query: query
}
