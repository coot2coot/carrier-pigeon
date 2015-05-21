var editOrder = {};

editOrder.user = function () {
	var mock = {
		first_name: 'Natalia',
  		last_name: 'Baltazar',
  		invitation: true 
  	}
	return mock;
}

editOrder.units = function () {
	var mock = { 
		unit_number: [ 'Unit no.', 'unit No', 'werw' ],
  		unit_id: [ '92', '93', '94' ],
  		unit_type: [ '40dc', 'unit Type', 'wer' ],
  		unit_loading_reference: [ '342', 'wer', 'wer' ],
  		unit_loading_date: [ '', '', '' ],
  		unit_loading_time: [ '03:04:00', '02:03:00', '21:04:00' ],
  		unit_net_weight: [ '3', '4', '5' ],
  		unit_gross_weight: [ '4', '4', '5' ],
  		unit_volume: [ '4', '3', '5' ],
  		unit_commodity_description: [ 'stwhuwher', 'more stuff', '????' ],
  		unit_no_of_packages: [ '4', '-3', '5' ],
  		unit_kind_of_packages: [ 'dunno', 'still dunno', 'ejfi' ],
  		job_number: '81' 
  	}
  	return mock;
}

editOrder.deleteUnit = function () {
	var mock = {};
	return mock;
}

module.exports = editOrder;