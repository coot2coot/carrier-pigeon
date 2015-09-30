var React       = require('react');
var BookingPage = require("./booking-note-page.jsx");
var EmailInput  = require("./email-input.jsx");

var toPdf  = require("../../lib/create-booking-pdf.js");
var printBooking  = require("../../lib/print-booking-note.js");

var bookingNoteButtons = React.createClass({
    getInitialState: function() {
        return {
            emailInput: false
        };
    },

    emailBooking: function (event) {
        var getOrderUrl = "/booking-note/email";
        var that = this;
        var emails = event.target.getElementsByTagName('input')
        console.log('hello')

        toPdf('booking-note', function (pdf) {

            var data = {
                order: JSON.stringify(that.props.order),
                attachment: pdf,
                toemail: emails.toemail.value,
                ccemail: emails.ccemail.value
            };

            $.post(getOrderUrl, data, function() {
                that.setState({
                    emailInput: false
                })
            })

            .fail(function () {
                "get units request failed"
            });
        })
        event.preventDefault();
    },

    printBooking: function () {
        printBooking('booking-note');
    },

    onCloseComponent: function () {
        this.setState({
            emailInput: false
        })
    },

    enterEmail: function () {
        this.setState({
            emailInput: true
		})
    },

    render: function() {
        return (
            <links className="container">
                <div className="row">
                    <div className="column-14 push-1">
                        <a className="button blue" onClick={this.printBooking}>
                            Print
                        </a>

						<a className="button blue" onClick={this.enterEmail}>
                            Email
                        </a>
                    </div>
                </div>

                {( this.state.emailInput
                    ? <EmailInput closeView={this.onCloseComponent} sendEmail={this.emailBooking}/>
                    : <p></p>
                )}

            </links>
        )
    }
});


module.exports = bookingNoteButtons;
