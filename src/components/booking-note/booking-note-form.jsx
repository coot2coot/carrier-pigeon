var React       = require('react');
var UnitForm    = require("./booking-note-unit.jsx");

// For emailing as a pdf, inine styling is required.
var text = {
    border: "none",
    border: "1pt black solid",
    fontSize: "10pt",
    padding: "0 2pt",
    margin: "0",
    minHeight: "28px",
    fontFamily: "Verdana, Geneva, sans-serif"
}

var p = {
    color: "black",
    fontSize: "10pt",
    fontFamily: "Verdana, Geneva, sans-serif"
}

var tableHeader = {
    backgroundColor: "#B9F3F4",
    border: "1pt black solid",
    textAlign: "center",
    fontSize: "10pt",
    fontFamily: "Verdana, Geneva, sans-serif"
}

var bigTableHeader = {
    backgroundColor: "#B9F3F4",
    border: "1pt black solid",
    textAlign: "center",
    fontSize: "10pt",
    height: "30pt",
    fontFamily: "Verdana, Geneva, sans-serif"
}

var fullWidth = {
    width: "100%",
    marginBottom: "24px",
    float: "left"
}

var halfWidth = {
    width: "50%",
    float: "left"
}

var sixthWidth = {
    width: "16.6%",
    float: "left"
}

var bookingNoteForm = React.createClass({

    getDefaultProps: function () {
        return {
            units: []
        };
    },

    render: function() {

        var order               = this.props.order;
        var instructionsArray   = [];

        if (order.special_instructions && (order.special_instructions !== undefined)) {
            instructionsArray = order.special_instructions.split('\n');
        }

        return (
            <div>
                <div style={fullWidth}>
                    <div style={sixthWidth}>
                        <div style={bigTableHeader}>
                            <b> Collect on: </b>
                        </div>
                    </div>
                    <div style={sixthWidth}>
                        <div style={bigTableHeader}>
                            <b> Collect at: </b>
                        </div>
                    </div>
                    <div style={sixthWidth}>
                        <div style={bigTableHeader}>
                            <b> Equipment: </b>
                        </div>
                    </div>
                    <div style={sixthWidth}>
                        <div style={bigTableHeader}>
                            <b> Loading reference: </b>
                        </div>
                    </div>
                    <div style={sixthWidth}>
                        <div style={bigTableHeader}>
                            <b> Commodity description: </b>
                        </div>
                    </div>
                    <div style={sixthWidth}>
                        <div style={bigTableHeader}>
                            <b> Gross weight: </b>
                        </div>
                    </div>
                    {
                        this.props.units.sort(function (a,b) {
                            console.log(a)
                            return new Date(a.unit_loading_date) - new Date(b.unit_loading_date)
                        }).map(function (unit) {
                            return <UnitForm unit={unit} />
                        })
                    }
                </div>


                <div style={fullWidth}>
                    <div style={halfWidth}>
                        <div style={tableHeader}>
                            <b> Collect from: </b>
                        </div>
                        <div style={text}>
                            {order.collect_from}
                        </div>
                    </div>
                    <div style={halfWidth}>
                        <div style={tableHeader}>
                            <b> Deliver to: </b>
                        </div>
                        <div style={text}>
                            {order.deliver_to}
                        </div>
                    </div>
                </div>

                <div style={fullWidth}>
                    <div style={tableHeader}>
                        <b> Special Instructions: </b>
                    </div>
                    <div style={text}>
                        { instructionsArray.map(function (item) {
                            return <p style={p}> { item } </p>
                        })}
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = bookingNoteForm;
