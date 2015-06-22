/** @jsx React.DOM */

var React  = require('react');

var UnitForm = require("./booking-note-unit.jsx");

// For emailing as a pdf, inine styling is required.
var table = {
    width: "100%",
    marginBottom: "24px"
}

var th = {
    fontSize: "10pt",
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
    fontSize: "11pt",
    padding: "2px 0",
    margin: "0"
}

var tdRight = {
    border: "none",
    fontSize: "11pt",
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
                        <th style={th}><b> Collect on: </b></th>
                        <th style={th}><b> Collect at: </b></th>
                        <th style={th}><b> Equipment: </b></th>
                        <th style={th}><b> Loading reference: </b></th>
                        <th style={th}><b> Commodity description: </b></th>
                        <th style={th}><b> Gross weight: </b></th>
                    </tr>
                    { this.props.units.map(function(unit){
                        return <UnitForm unit={unit} />
                    })}
                </table>

                <table style={table}>
                    <tr style={trHeader}>
                        <th style={th}><b> Collect from: </b></th>
                        <th style={th}><b> Deliver to: </b></th>
                    </tr>
                    <tr>
                        <td style={td}>{order.collect_from}</td>
                        <td style={tdRight}>{order.deliver_to}</td>
                    </tr>
                </table>

                <table style={table}>
                    <tr style={trHeader}>
                        <th style={th}><b> Special Instructions: </b></th>
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
