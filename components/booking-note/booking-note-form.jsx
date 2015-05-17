/** @jsx React.DOM */

var React  = require('react');

var bookingNoteFrom = React.createClass({
    render: function() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><h5>Loading Place</h5></td>
                            <td>{this.props.order.collect_from}</td>
                        </tr>
                        <tr>
                            <td><h5>Delivery Place</h5></td>
                            <td>{this.props.order.deliver_to}</td>
                        </tr>
                        <tr>
                            <td><h5>Container Type/Vehicle</h5></td>
                            <td>{this.props.order.deliver_to}</td>
                        </tr>
                        <tr>
                            <td><h5>Reference</h5></td>
                            <td>{this.props.order.loading_reference}</td>
                        </tr>
                        <tr>
                            <td><h5>Commodity Description</h5></td>
                            <td>{this.props.order.commodity_details}</td>
                        </tr>
                        <tr>
                            <td><h5>Collection Date/Time</h5></td>
                            <td>{this.props.order.collection_date} / {this.props.order.collection_time}</td>
                        </tr>
                        <tr>
                            <td><h5>Contact Details</h5></td>
                            <td>{this.props.order.contact_details}</td>
                        </tr>
                        <tr>
                            <td><h5>Additional Information</h5></td>
                            <td>{this.props.order.remarks}</td>
                        </tr>
                    </tbody>
                </table>

                <h5><u>Waybill Instructions</u></h5>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td><h5>Shipper</h5></td>
                            <td>{this.props.order.shipper}</td>
                        </tr>
                        <tr>
                            <td><h5>Consignee</h5></td>
                            <td>{this.props.order.consignee}</td>
                        </tr>
                        <tr>
                            <td><h5>Notify</h5></td>
                            <td>{this.props.order.notify}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});


module.exports = bookingNoteFrom;
