var addOrder = {};

addOrder.fullOrder = function() {
	var mock = { 
	 	date: '2015-05-21',
	  	client: 'ewer',
	  	carrier: 'wer',
	  	unit_number: [ 'wer', 'wer' ],
	  	unit_type: [ 'wer', 'wer' ],
	  	unit_loading_reference: [ '', '' ],
	  	unit_loading_date: [ '', '' ],
	  	unit_loading_time: [ '', '' ],
	  	unit_net_weight: [ '', '' ],
	  	unit_gross_weight: [ '', '' ],
	  	unit_volume: [ '', '' ],
	  	unit_commodity_description: [ '', '' ],
	  	unit_no_of_packages: [ '', '' ],
	  	unit_kind_of_packages: [ '', '' ],
	  	collect_from: '',
	  	deliver_to: '',
	  	special_instructions: '',
	  	remarks: '',
	  	port_of_loading: '',
	  	port_of_discharge: '',
	  	vessel: '',
	  	ets: '',
	  	eta: '',
	  	shipper: '',
	  	consignee: '',
	  	notify: '' 
	}
	return mock;
}

addOrder.order = function() {
	var mock = { 
		date: '2015-05-21',
	    client: 'TEST',
	    carrier: 'TEST',
	    collect_from: 'TEST',
	    deliver_to: 'TEST',
	    special_instructions: 'TEST',
	    remarks: 'TEST',
	    port_of_loading: 'TEST',
	    port_of_discharge: 'TEST',
	    vessel: 'TEST',
	    ets: 'TEST',
	    eta: 'TEST',
	    shipper: 'SET',
	    consignee: 'TEST',
	    notify: 'TEST' 
	}
	return mock;
}

addOrder.stringifiedTestData = function() {
	var mock = { 
		columns: "date, client, carrier, collect_from, deliver_to, " + 
				"special_instructions, remarks, port_of_loading, " + 
				"port_of_discharge, vessel, ets, eta, shipper, consignee, notify",
  		values: "'2015-05-21','TEST','TEST','TEST','TEST','TEST','TEST'," + 
  				"'TEST','TEST','TEST','TEST','TEST','SET','TEST','TEST'" 
  	}
	return mock;
}

addOrder.oneUnit = function() {
	var mock = {
		unit_number: 'Unit no.',
  		unit_type: '40sc',
  		unit_loading_reference: 'dunno',
  		unit_loading_date: '2015-05-14',
  		unit_loading_time: '12:30',
  		unit_net_weight: '4',
  		unit_gross_weight: '4',
  		unit_volume: '5',
  		unit_commodity_description: 'somethime',
  		unit_no_of_packages: '4',
  		unit_kind_of_packages: '??',
  		job_number: undefined
  	}
	return mock;
}

addOrder.stringifiedOneUnit = function() {
	var mock = { 
		columns: "unit_number, unit_type, unit_loading_reference, " +
				"unit_loading_date, unit_loading_time, unit_net_weight, " +
				"unit_gross_weight, unit_volume, unit_commodity_description, " +
				"unit_no_of_packages, unit_kind_of_packages, job_number",
  		values: "'Unit no.','40sc','dunno','2015-05-14','12:30','4'," +
  				"'4','5','somethime','4','??'," + 
  				"(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)" 
  	}
	return mock;
}

addOrder.multiUnits = function() {
	var mock = { 
		unit_number: [ 'efwe', 'ewrw', 'werw' ],
        unit_type: [ '40dc', 'wer', 'wer' ],
        unit_loading_reference: [ '342', 'wer', 'wer' ],
        unit_loading_date: [ '2015-05-22', '2015-05-09', '2015-05-24' ],
        unit_loading_time: [ '03:04', '02:03', '21:04' ],
        unit_net_weight: [ '4', '3', '5' ],
        unit_gross_weight: [ '4', '4', '5' ],
        unit_volume: [ '4', '3', '5' ],
        unit_commodity_description: [ 'stuff', 'more stuff', 'blah' ],
        unit_no_of_packages: [ '4', '-3', '5' ],
        unit_kind_of_packages: [ 'dunno', 'still dunno', 'ejfi' ],
        job_number: undefined 
    }
	return mock;
}

addOrder.stringifiedMultiUnits = function() {
	var mock = { 
		columns: "unit_number,unit_type,unit_loading_reference," +
			"unit_loading_date,unit_loading_time,unit_net_weight," +
			"unit_gross_weight,unit_volume,unit_commodity_description," +
			"unit_no_of_packages,unit_kind_of_packages,job_number",
  		values: "'efwe','40dc','342','2015-05-22','03:04','4','4','4'," +
			"'stuff','4','dunno'," +
			"(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1))," +
			"('ewrw','wer','wer','2015-05-09','02:03','3'," +
			"'4','3','more stuff','-3','still dunno'," +
			"(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1))," +
			"('werw','wer','wer','2015-05-24','21:04','5','5','5','blah','5','ejfi'," +
			"(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)"
	}
	return mock;
}

module.exports = addOrder;
