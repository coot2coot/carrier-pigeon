var React  = require('react');

var Header         = require("../header/header.jsx");
// TODO:
// If the buttons don't work... If email: Please double check your email address and try again.
// If save/print doesn't work... sorry, there has been an internal error. Try again at a late point.
var Error          = require("../error-message.jsx");
var BookingOptions = require("./booking-note-options.jsx");
var BookingPage    = require("./booking-note-page.jsx");
var getJobNumber = require("../../lib/format-job-number.js");

var bookingNote = React.createClass({
    getInitialState: function() {
        return {
            order: {
                job_number: "",
                date: ""
            }
        };
    },

    componentWillMount: function() {
        var getOrderUrl = "/order/get/" + this.props.params.job_no;

        $.get(getOrderUrl, function(result) {
            if(result !== ""){
                var order = JSON.parse(result);

                this.setState({
                    order: order.order,
                    units: order.units
                });
            }
        }.bind(this))
        .fail(function () {
            "get units request failed";
        });
    },

    setUser: function(user) {
        this.setState({
            user: user
        });
    },

    render: function() {
        return (
            <div >
                <Header setUser={this.setUser}/>
                <BookingOptions bookingType={this.props.params.booking_type} order={this.state.order} units={this.state.units}/>
                <BookingPage bookingType={this.props.params.booking_type} order={this.state.order} units={this.state.units}/>
            </div>
        )
    }
});

module.exports = bookingNote;
