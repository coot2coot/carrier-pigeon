/** @jsx React.DOM */

var React  = require('react');
var BookingPage = require("./booking-note-page.jsx");

var bookingNote = React.createClass({
    emailBooking: function () {

        var getOrderUrl = "/booking-note/email";

        var data = React.renderToString(
            <BookingPage order={this.props.order} />
        );

        $.post(getOrderUrl, "attachment=" + data, function(result) {
            if(result !== ""){
                var order = JSON.parse(result);

                this.setState({
                    order : order,
                });
            }
        }.bind(this))
        .fail(function () {
            "get units request failed"
        });
    },

    downloadBooking: function () {

    },

    printBooking: function () {

    },

    render: function() {
        return (
            <links className="container">
                <div className="row">
                    <div className="column-14 push-1">
                        <a className="button blue" onClick={this.printBooking}>
                            Print
                        </a>

                        <a className="button blue" onClick={this.downloadBooking}>
                            Download
                        </a>
                        
                        <a className="button blue" onClick={this.emailBooking}>
                            Email
                        </a>
                    </div>
                </div>
            </links>
        )
    }
});


module.exports = bookingNote;