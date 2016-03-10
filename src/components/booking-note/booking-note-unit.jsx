var React       = require('react');
var formatDate  = require("../../lib/format-date.js");

var fullWidth = {
    width: "100%",
    float: "left"
};

var text = {
    fontSize: "11pt",
    padding: "0 2pt",
    margin: "0",
    minHeight: "28px",
    textAlign: 'center'
};

var rows = {
    border: "1px solid black",
    borderCollapse: "collapse",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    paddingLeft: "5px",
    paddingTop: "1em",
    paddingBottom: "1em"
};

var unitsInformation = React.createClass({
    render: function() {
        return (
          <tr>
            <td style={rows}>{this.props.unit.unit_loading_date ? formatDate(this.props.unit.unit_loading_date) : ""}</td>
            <td style={rows}>{this.props.unit.unit_loading_time ? this.props.unit.unit_loading_time.substring(0, 5) : ""}</td>
            <td style={rows}>{this.props.unit.unit_loading_reference}</td>
            <td style={rows}>{this.props.unit.unit_type}</td>
            <td style={rows}>{this.props.unit.unit_no_of_packages}</td>
            <td style={rows}>{this.props.unit.unit_gross_weight} {this.props.unit.unit_gross_weight ? this.props.unit.unit_weight : ""}</td>
            <td style={rows}>{this.props.unit.unit_commodity_description}</td>
          </tr>
        )
    }
});

module.exports = unitsInformation;
