var addContact = {};

addContact.fullContact = function () {

	var mock = { 
					contact_id: '251',
					company_name: ' new',
					vat_number: '456ghtd',
					category: '',
					address_line: '',
					city: 'london',
					county: '',
					postcode: '',
					country: '',
					name: 'dave',
					telephone: '0203467893',
					email: '',
					remarks: '',
					sales_report: '',
					reminder_message: [ 'sdfg', 'dsfg' ],
					reminder_date: [ '2015-07-31', '2015-08-16' ],
					reminder_reminder_id: [ '3', '4' ],
				  	reminder_contact_reminders_id: [ '251', '251' ]
				}

	return mock;
}

module.exports = addContact;