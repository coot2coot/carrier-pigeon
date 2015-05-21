var addOrder = {};

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

addOrder.units = function() {
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

module.exports = addOrder;
