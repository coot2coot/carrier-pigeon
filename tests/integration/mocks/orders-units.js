var mock = {
    mockUnits : {
        unit_id: "23445",
        unit_number: "345fgd",
        unit_type:"40dc",
        job_number: ""
    },
    mockOrders : {
        job_number: "1234",
        client : 'fake',
        date : '10-10-2010',
    },
    mockOrders2 : {
        job_number: "12567",
        client : 'fake',
        date : '10-10-2010',
    },
    mockOrdersUnits : {
        unit: this.mockUnits,
        order: this.mockOrders,
        unit_delete: ""
    }
};

module.exports = mock;