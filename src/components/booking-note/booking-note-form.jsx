var React       = require('react');
var UnitForm    = require("./booking-note-unit.jsx");

// For emailing as a pdf, inine styling is required.
var text = {
    fontSize: "10pt",
    paddingRight: "15px",
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
    textAlign: "center",
    fontSize: "10pt",
    fontFamily: "Verdana, Geneva, sans-serif"
}

var bigTableHeader = {
    textAlign: "center",
    fontSize: "10pt",
    height: "30pt",
    fontFamily: "Verdana, Geneva, sans-serif"
}

var fullWidth = {
    width: "100%",
    marginBottom: "24px",
    marginTop: "15px",
    float: "left"
}

var header = {
    textDecoration: "underline",
    textAlign: "center",
    width: "100%",
    marginTop: "15px",
    float: "left"
}

var halfWidth = {
    width: "30%",
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
                <div style={header} >Unit Specific Details</div>
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
                            return new Date(a.unit_loading_date) - new Date(b.unit_loading_date)
                        }).map(function (unit) {

                            return <UnitForm unit={unit} />
                        })
                    }
                </div>

                <div style={header}>Order Details</div>
                <div style={fullWidth}>
                    <div style={halfWidth}>
                        <b> Collect from: </b>
                    </div>
                    <div style={text}>
                        {order.collect_from}
                    </div>
                </div>

                <div style={fullWidth}>
                    <div style={halfWidth}>
                        <b> Deliver to: </b>
                    </div>
                    <div style={text}>
                        {order.deliver_to}
                    </div>
                </div>

                <div style={fullWidth}>
                    <div style={halfWidth}>
                        <b> Special Instructions: </b>
                    </div>
                    <div style={text}>
                        {order.special_instructions}
                    </div>
                </div>

            </div>
        )
    }
});


module.exports = bookingNoteForm;
