var React       = require('react');
var formatDate  = require("../../lib/format-date.js");

var fullWidth = {
    width: "100%",
    float: "left"
}

var seventhWidth = {
    width: "14.285%",
    float: "left"
}

var text = {
    fontSize: "11pt",
    padding: "0 2pt",
    margin: "0",
    minHeight: "28px",
    textAlign: 'center'
}

var unitsInformation = React.createClass({
    render: function() {
        return (
            <div style={fullWidth}>
                <div style={seventhWidth}>
                    <div style={text}>
                        {this.props.unit.unit_loading_date ? formatDate(this.props.unit.unit_loading_date) : ""}
                    </div>
                </div>
                <div style={seventhWidth}>
                    <div style={text}>
                       {this.props.unit.unit_loading_time ? this.props.unit.unit_loading_time.substring(0, 5) : ""}
                    </div>
                </div>
                <div style={seventhWidth}>
                    <div style={text}>
                        {this.props.unit.unit_loading_reference}
                    </div>
                </div>
                <div style={seventhWidth}>
                    <div style={text}>
                        {this.props.unit.unit_type}
                    </div>
                </div>
                <div style={seventhWidth}>
                    <div style={text}>
                        {this.props.unit.unit_no_of_packages}
                    </div>
                </div>
                <div style={seventhWidth}>
                    <div style={text}>
                        {this.props.unit.unit_gross_weight} {this.props.unit.unit_gross_weight ? this.props.unit.unit_weight : ""}
                    </div>
                </div>
                <div style={seventhWidth}>
                    <div style={text}>
                        {this.props.unit.unit_commodity_description}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = unitsInformation;
