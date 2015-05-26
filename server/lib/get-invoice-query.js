"use strict";
var query = {};

query.invoice = function (invoices){
    var i;
    var query = {
        update: "",
        create: ""
    };

    if(typeof invoices.currency ==="object"){
        for(i = 0; i < invoices.currency.length; i ++){
            
            var props,
                updateArr = [];

            if(invoices.invoice_id[i] !== ""){
                for (props in invoices) {
                    if (props !== "invoice_id" && props !== "job_number" && props !== "delete_invoice") {
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
                    if (props !== "invoice_id" && props !== "job_number" && props !== "delete_invoice") {

                        data.columns.push(props);

                        if (props === "amount" || props === "invoice_number") {
                            var value = invoices[props][i];
                        } else {
                            var value = "'" + invoices[props][i] + "'";
                        }
                        
                        if (invoices[props][i] === "") {
                            value = "null";
                        }
                        data.values.push(value);
                    }
                }

                query.create += "INSERT INTO invoice (" + data.columns.join() +
                                ",job_number) VALUES (" + data.values.join() + "," + 
                                invoices.job_number[i] + "); ";
            }
        }
    } else {
        var arr = [],
            str = "";
        if(invoices.invoice_id !== "") {
            for (props in invoices) {
                if (props !== "invoice_id" && props !== "job_number" && props !== "delete_invoice") {
                    var value = "'" + invoices[props] + "'";

                    if (invoices[props] === "") {
                        value = "null";
                    }
                    var str = props + "=" + value;
                    arr.push(str);
                }
            }
            query.update += "UPDATE invoices SET " + arr.join() + 
                    " WHERE invoice_id=" + invoices.invoice_id + "; ";
        } else {
            var data = {};
                data.columns = [];
                data.values = [];

            for (props in invoices) {
                if (props !== "invoice_id" && props !== "job_number" && props !== "delete_invoice") {

                    data.columns.push(props);

                    if (props === "amount" || props === "invoice_number") {
                        var value = invoices[props];
                    } else {
                        var value = "'" + invoices[props] + "'";
                    }
                    
                    if (invoices[props] === "") {
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
    return query;
}

query.invoiceDelete = function (toDelete) {
    if (toDelete !== ""){
        var arr = toDelete.split(",")
        var deleteQuery = "";
        var i;

        for(i = 0; i < arr.length; i++){
            deleteQuery += "DELETE FROM invoice WHERE invoice_id = "+arr[i]+";"
        }
        return deleteQuery
    }else{
        return "";
    }

}


module.exports = {
    query: query
}
