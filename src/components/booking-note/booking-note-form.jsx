/** @jsx React.DOM */

var React  = require('react');

var UnitForm = require("./booking-note-unit.jsx");

// For emailing as a pdf, inine styling is required.
var table = {
    width: "100%",
    marginBottom: "24px"
}

var th = {
    fontSize: "9px",
    fontWeight: "600",
    border: "1px black solid",
    padding: "2px 0",
    background: "none",
    margin: "0"
}

var trHeader = {
    backgroundColor: "#B9F3F4"
}

var td = {
    border: "none",
    borderRight: "1px black solid",
    fontSize: "10px",
    padding: "2px 0",
    margin: "0"
}

var tdRight = {
    border: "none",
    fontSize: "10px",
    padding: "2px"
}

var bookingNoteForm = React.createClass({
    getDefaultProps: function () {
        return {
            units: [] 
        };
    },
    render: function() {
        var order = this.props.order;
        return (
            <div>
                <table style={table}>
                    <tr style={trHeader}>
                        <th style={th}>Collect on:</th>
                        <th style={th}>Collect at:</th>
                        <th style={th}>Equipment:</th>
                        <th style={th}>Loading reference:</th>
                        <th style={th}>Commodity description:</th>
                        <th style={th}>Gross weight:</th>
                    </tr>
                    { this.props.units.map(function(unit){
                        return <UnitForm unit={unit} />
                    })}
                </table>

                <table style={table}>
                    <tr style={trHeader}>
                        <th style={th}>Collect from:</th>
                        <th style={th}>Deliver to:</th>
                    </tr>
                    <tr>
                        <td style={td}>{order.collect_from}</td>
                        <td style={tdRight}>{order.deliver_to}</td>
                    </tr>
                </table>

                <table style={table}>
                    <tr style={trHeader}>
                        <th style={th}>Special Instructions:</th>
                    </tr>
                    <tr>
                        <td style={tdRight}>{order.special_instructions}</td>
                    </tr>
                </table>
            </div>
        )
    }
});


module.exports = bookingNoteForm;
