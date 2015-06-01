/** @jsx React.DOM */

var React  = require('react');

var table = {
    width: "100%"
}

var th = {
    fontSize: "9px",
    fontWeight: "600",
    border: "1px black solid",
    padding: "2px 0",
    background: "none",
    backgroundColor: "#B9F3F4"
}

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

var bookingNoteForm = React.createClass({
    render: function() {
        var order = this.props.order;
        var units = this.props.units;
        return (
            <div>
                <table style={table}>
                    <tr>
                        <th style={th}>Collect on:</th>
                        <th style={th}>Collect at:</th>
                        <th style={th}>Equipment:</th>
                        <th style={th}>Loading reference:</th>
                        <th style={th}>Commodity description:</th>
                        <th style={th}>Gross weight:</th>
                    </tr>
                    {/* TODO: loop through all the units here*/}
                </table>

                <table style={table}>
                    <tr>
                        <th style={th}>Collect from:</th>
                        <th style={th}>Deliver to:</th>
                    </tr>
                    <tr>
                        <td style={td}>{order.collect_from}</td>
                        <td style={tdRight}>{order.deliver_to}</td>
                    </tr>
                </table>

                <table style={table}>
                    <tr>
                        <th style={th}>Special Instructions:</th>
                    </tr>
                    <tr>
                        <td style={td}>{order.special_instructions}</td>
                    </tr>
                </table>
            </div>
        )
    }
});


module.exports = bookingNoteForm;
