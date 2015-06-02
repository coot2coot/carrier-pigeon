var editOrder = {};

editOrder.user = function () {
    var mock = {
        first_name: 'Natalia',
        last_name: 'Baltazar',
        invitation: true 
    }
    return mock;
}

editOrder.updateUnits = function () {
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

editOrder.createUnit = function () {
    var mock = { 
        unit_number: [ '3453', 'ertert' ],
        unit_id: [ '706', '' ],
        unit_type: [ '3453', 'ertet' ],
        unit_loading_reference: [ '3453', 'etert' ],
        unit_loading_date: [ '', '2015-06-11' ],
        unit_loading_time: [ '', '04:03' ],
        unit_weight: [ 'kg', 'kg' ],
        unit_net_weight: [ '', '3.2' ],
        unit_gross_weight: [ '', '4.6' ],
        unit_volume: [ '', '2.5' ],
        unit_commodity_description: [ '34534', 'ertert' ],
        unit_no_of_packages: [ '', '3' ],
        unit_kind_of_packages: [ '', 'ete' ],
        job_number: '566'
    }
    return mock;
}

module.exports = editOrder;