var invoice = {};

invoice.createRes = function() {
	var mock = { 
		amount: [ '1000.61', '200.78', '0.04', '1000.61', '200.78', '300.98' ],
  		invoice_number: [ '254', '2568', '5', '254', '2568', '780' ],
  		invoice_id: [ '1', '4', '', '2', '3', '5' ],
  		type: [ 'purchase', 'purchase', '', 'sales', 'sales', 'sales' ],
  		currency: [ '£', '£', '£', '£', '£', '£' ],
  		job_number: [ '317', '317', '317', '317', '317', '317' ] 
  	}

  	return mock;
}

invoice.createTest = function() {
	var result = "INSERT INTO invoice " + 
				"(amount,invoice_number,type,currency,job_number) " + 
				"VALUES ('0.02','6',null,null,317,317,,317,317,317); ";

	return result;
}

module.exports = invoice;
