/** @jsx React.DOM */

var React  = require('react');

var td = {
    border: "none",
    borderRight: "1px black solid",
    fontSize: "10px",
    padding: "2px"
}

var tdRight = {
    border: "none",
    fontSize: "10px",
    padding: "2px"
}

var unitsInformation = React.createClass({
    render: function() {
        return (
            <tr>
                <td style={td}>{this.props.unit.unit_loading_date}</td>
                <td style={td}>{this.props.unit.unit_loading_time}</td>
                <td style={td}>{this.props.unit.unit_type}</td>
                <td style={td}>{this.props.unit.unit_loading_reference}</td>
                <td style={td}>{this.props.unit.unit_commodity_description}</td>
                <td style={td}>{this.props.unit.unit_gross_weight}</td>
            </tr>
        )
    }
});


module.exports = unitsInformation;