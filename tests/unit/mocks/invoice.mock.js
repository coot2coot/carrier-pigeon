var invoice = {};

invoice.createRes = function() {
	var mock = { 
		amount: [ "1000.61", "200.78", "0.04", "1000.61", "200.78", "300.98" ],
  		invoice_number: [ "254", "2568", "5", "254", "2568", "780" ],
  		invoice_id: [ "1", "4", "", "2", "3", "5" ],
  		type: [ "purchase", "purchase", "purchase", "sales", "sales", "sales" ],
  		currency: [ "£", "£", "£", "£", "£", "£" ],
  		job_number: [ "317", "317", "317", "317", "317", "317" ],
  		delete_invoice: "6, 7"
  	}

  	return mock;
}

invoice.createOne = function() {
	var mock = { 
		amount: "0.04",
  		invoice_number: "5",
  		invoice_id: "",
  		type: "purchase",
  		currency: "£",
  		job_number: "317",
  		delete_invoice: ""
  	}

  	return mock;
}

invoice.another = function() {
	var mock = { 
		amount: [ '1000.00', '500', '1232.00', '3242' ],
  		invoice_number: [ 'DELETE', 'XDELETE', 'DELETE', 'DELETE' ],
  		invoice_id: [ '62', '', '63', '' ],
  		type: [ 'purchase', 'purchase', 'sales', 'sales' ],
  		currency: [ '£', '£', '£', '£' ],
  		job_number: [ '151', '151', '151', '151' ] 
  	}

  return mock;
}

invoice.createTest = function() {
	var result = "INSERT INTO invoice " + 
				"(amount,invoice_number,type,currency,job_number) " + 
				"VALUES (0.04,'5','purchase','£',317); ";

	return result;
}

invoice.updateTest = function() {
	var result = "UPDATE invoice SET amount='1000.61',invoice_number='254'," +
				"type='purchase',currency='£' WHERE invoice_id=1; " +
				"UPDATE invoice SET amount='200.78',invoice_number='2568'," +
				"type='purchase',currency='£' WHERE invoice_id=4; " +
				"UPDATE invoice SET amount='1000.61'," +
				"invoice_number='254',type='sales',currency='£' WHERE " +
				"invoice_id=2; UPDATE invoice SET amount='200.78'," +
				"invoice_number='2568',type='sales',currency='£' " +
				"WHERE invoice_id=3; UPDATE invoice SET amount='300.98'," +
				"invoice_number='780',type='sales',currency='£' WHERE " +
				"invoice_id=5; ";

	return result;
}

invoice.deleteTest = function() {
	var result = "DELETE FROM invoice WHERE invoice_id = 6;DELETE FROM invoice WHERE invoice_id =  7;";

	return result;
}

invoice.anotherTest = function() {
	var result = { 
		create: "INSERT INTO invoice (amount,invoice_number,type,currency,job_number) VALUES (500,'XDELETE','purchase','£',151); " +
				"UPDATE orders SET has_invoices=true WHERE job_number=151; " +
				"INSERT INTO invoice (amount,invoice_number,type,currency,job_number) VALUES (3242,'DELETE','sales','£',151); " +
				"UPDATE orders SET has_invoices=true WHERE job_number=151; ", 
		update: "UPDATE invoice SET amount='1000.00',invoice_number='DELETE'," +
				"type='purchase',currency='£' WHERE invoice_id=62; UPDATE invoice SET " +
				"amount='1232.00',invoice_number='DELETE',type='sales',currency='£' " +
				"WHERE invoice_id=63; "
	}
	return result;
}

module.exports = invoice;