(function () {
	"use strict"
	var contacts = {};

	contacts.updated = true;

	contacts.store = [];

	contacts.refresh = function () {
		contacts.updated = !contacts.updated
	}

	// if a new contact has not been added => get from store, else => Ajax call
	contacts.get = function (cb) {
		var getContactUrl = "/contacts/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getContactUrl = "/contacts/get/nocache"
		}

		if (contacts.updated) {
			contacts.updated = !contacts.updated
			$.ajax({
		        url: getContactUrl,
		        dataType: "Text",
		        type: "GET",
		        data: {},
		        error: function (err) {
		            console.error("Get contacts call did not work");
		        },
		        success: function (data) {
		        	contacts.store = JSON.parse(data)
		        	cb(contacts.store);
		        	return contacts.store
		        }
		    });
		} else {
			cb(contacts.store)
		}
	}
	module.exports = contacts;
})();