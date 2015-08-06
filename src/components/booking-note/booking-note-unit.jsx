/** @jsx React.DOM */

var React       = require('react');
var formatDate = require("../../lib/format-date.js");

var td = {
    border: "none",
    borderRight: "1px black solid",
    fontSize: "11pt",
    padding: "2px"
}

var tdRight = {
    border: "none",
    fontSize: "11pt",
    padding: "2px"
}

var unitsInformation = React.createClass({
    render: function() {
        return (
            <tr>
                <td style={td}>{this.props.unit.unit_loading_date ? formatDate(this.props.unit.unit_loading_date) : ""}</td>
                <td style={td}>{this.props.unit.unit_loading_time ? this.props.unit.unit_loading_time.substring(0, 5) : ""}</td>
                <td style={td}>{this.props.unit.unit_type}</td>
                <td style={td}>{this.props.unit.unit_loading_reference}</td>
                <td style={td}>{this.props.unit.unit_commodity_description}</td>
                <td style={td}>{this.props.unit.unit_gross_weight} {this.props.unit.unit_gross_weight ? this.props.unit.unit_weight : ""}</td>
            </tr>
        )
    }
});


module.exports = unitsInformation;