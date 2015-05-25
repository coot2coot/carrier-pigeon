/** @jsx React.DOM */

var React  = require('react');

var h5 = {
    display: "block",
    fontSize: "12px",
    color: "black",
    fontWeight: "700",
    padding: "2px"
}

var table = {
    border: "1px #D8D8D8 solid",
    width: "100%"
}

var td = {
    borderRight: "1px #D8D8D8 solid",
    borderBottom: "1px #D8D8D8 solid",
    fontSize: "12px",
    padding: "2px"
}

var tdLast = {
    borderRight: "1px #D8D8D8 solid",
    fontSize: "12px",
    padding: "2px"
}

var tdRight = {
    borderBottom: "1px #D8D8D8 solid",
    fontSize: "12px",
    padding: "2px"
}

var tdCorner = {
    fontSize: "12px",
    padding: "2px"
}

var bookingNoteFrom = React.createClass({
    render: function() {
        return (
            <div>
                <table style={table}>
                    <tbody>
                        <tr>
                            <td style={td}><h5 style={h5}>Loading Place</h5></td>
                            <td style={tdRight}>{this.props.order.collect_from}</td>
                        </tr>
                        <tr>
                            <td style={td}><h5 style={h5}>Delivery Place</h5></td>
                            <td style={tdRight}>{this.props.order.deliver_to}</td>
                        </tr>
                        <tr>
                            <td style={td}><h5 style={h5}>Container Type/Vehicle</h5></td>
                            <td style={tdRight}>{this.props.order.deliver_to}</td>
                        </tr>
                        <tr>
                            <td style={td}><h5 style={h5}>Reference</h5></td>
                            <td style={tdRight}>{this.props.order.loading_reference}</td>
                        </tr>
                        <tr>
                            <td style={td}><h5 style={h5}>Commodity Description</h5></td>
                            <td style={tdRight}>{this.props.order.commodity_details}</td>
                        </tr>
                        <tr>
                            <td style={td}><h5 style={h5}>Collection Date/Time</h5></td>
                            <td style={tdRight}>{this.props.order.collection_date} / {this.props.order.collection_time}</td>
                        </tr>
                        <tr>
                            <td style={td}><h5 style={h5}>Contact Details</h5></td>
                            <td style={tdRight}>{this.props.order.contact_details}</td>
                        </tr>
                        <tr>
                            <td style={tdLast}><h5 style={h5}>Additional Information</h5></td>
                            <td style={tdCorner}>{this.props.order.remarks}</td>
                        </tr>
                    </tbody>
                </table>

                <h5 style={h5}><u>Waybill Instructions</u></h5>
                <br />
                <table style={table}>
                    <tbody>
                        <tr>
                            <td style={td}><h5 style={h5}>Shipper</h5></td>
                            <td style={tdRight}>{this.props.order.shipper}</td>
                        </tr>
                        <tr>
                            <td style={td}><h5 style={h5}>Consignee</h5></td>
                            <td style={tdRight}>{this.props.order.consignee}</td>
                        </tr>
                        <tr>
                            <td style={tdLast}><h5 style={h5}>Notify</h5></td>
                            <td style={tdCorner}>{this.props.order.notify}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});


module.exports = bookingNoteFrom;
