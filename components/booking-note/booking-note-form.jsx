/** @jsx React.DOM */

var React  = require('react');

var bookingNoteFrom = React.createClass({
    render: function() {
        console.log(this.props);
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><h4>Loading Place</h4></td>
                            <td>{this.props.order.collect_from}</td>
                        </tr>
                        <tr>
                            <td><h4>Delivery Place</h4></td>
                            <td>{this.props.order.deliver_to}</td>
                        </tr>
                        <tr>
                            <td><h4>Container Type/Vehicle</h4></td>
                            <td>{this.props.order.deliver_to}</td>
                        </tr>
                        <tr>
                            <td><h4>Reference</h4></td>
                            <td>{this.props.order.loading_reference}</td>
                        </tr>
                        <tr>
                            <td><h4>Commodity Description</h4></td>
                            <td>{this.props.order.commodity_details}</td>
                        </tr>
                        <tr>
                            <td><h4>Collection Date/Time</h4></td>
                            <td>{this.props.order.collection_date} / {this.props.order.collection_time}</td>
                        </tr>
                        <tr>
                            <td><h4>Contact Details</h4></td>
                            <td>{this.props.order.contact_details}</td>
                        </tr>
                        <tr>
                            <td><h4>Additional Information</h4></td>
                            <td>{this.props.order.remarks}</td>
                        </tr>
                    </tbody>
                </table>

                <h4><u>Waybill Instructions</u></h4>

                <table>
                    <tbody>
                        <tr>
                            <td><h4>Shipper</h4></td>
                            <td>{this.props.order.shipper}</td>
                        </tr>
                        <tr>
                            <td><h4>Consignee</h4></td>
                            <td>{this.props.order.consignee}</td>
                        </tr>
                        <tr>
                            <td><h4>Notify</h4></td>
                            <td>{this.props.order.notify}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});


module.exports = bookingNoteFrom;
