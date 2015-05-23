var mock = {}

mock = {
    job_number: "d",
    unit_id: "d",
    order : {
        unit:   {
            unit_number: "345fgd",
            unit_type:"40dc",
            job_number: ""
        },
        order: {
            client : 'fake',
            date : '10-10-2010',
        },
        unit_delete: ""
    },
    edit : {
        unit:  {
            get unit_id () {
                return mock.unit_id;
            },
            unit_number: "4",
            unit_type:"40dc"
        },
        order: {
            get job_number () {
                return mock.job_number;
            },
            client : 'fake',
            date : '10-10-2010'
        },
        unit_delete: ""
    },
    multipleEdit : {
        unit:   {
            get unit_id () {
                return [mock.unit_id,""];
            },
            get job_number () {
                return mock.job_number.toString()
            },
            unit_number: ["4","40"],
            unit_type:["40dc","40dd"]
        },
        order: {
            get job_number () {
                return mock.job_number
            },
            client : 'fake',
            date : '10-10-2010'
        },
        unit_delete: ""
    }
};



module.exports = mock;