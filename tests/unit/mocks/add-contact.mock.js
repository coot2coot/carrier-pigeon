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
};

addContact.oneReminder = function() {

	var mock = {
		message: 'Unit no.',
  		date: '2015-05-14',
  		contact_reminders_id: '',
  	};
	return mock;
};


addContact.multiReminders = function () {

	var mock = { 
		message: ['Unit no.', 'bugs'],
  		date: ['2015-05-14','2015-05-14'],
  		contact_reminders_id: ['','']
    };
	return mock;
};

addContact.stringifiedMultiReminders = function () {

	var mock = { 
		columns: "message,date,contact_reminders_id",
  		values: "('Unit no.','2015-05-14'," +
			"(SELECT contact_id FROM contacts ORDER BY contact_id DESC LIMIT 1))," +
			"('bugs','2015-05-14'," +
			"(SELECT contact_id FROM contacts ORDER BY contact_id DESC LIMIT 1))"
	};
	return mock;
};

module.exports = addContact;