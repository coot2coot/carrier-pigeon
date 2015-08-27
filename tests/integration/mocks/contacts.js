var mock = {}

mock = {
    contact_id: "place",
    contact : {
        singleValueObject: {
            name: "dave",
            vat_number: "456ghtd",
            city: "london"
        },
        multipleValuesObject: {
            date: "2015-08-26",
            message: "what"
        },
        multipleValuesObject2: {
            name: "dav",
            telephone: "1234",
            email: "dav@dd.com"
        }
    },
    edit : {

        singleValueObject: {
            contact_id: "false",
            vat_number: "456ghtd",
            city: "london"
        },
        multipleValuesObject: {
            date: "2015-08-26",
            message: "what",
            reminder_id: "",
            contact_reminders_id: "false"
        },
        multipleValuesObject2: {
            name: "dav",
            telephone: "1234",
            email: "dav@dd.com"
        },
        items_to_remove: ''
    }
};



module.exports = mock;