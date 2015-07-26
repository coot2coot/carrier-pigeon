/** @jsx React.DOM */

var React       = require('react');
var BookingPage = require("./booking-note-page.jsx");
var EmailInput  = require("./email-input.jsx");

var bookingNoteButtons = React.createClass({
    getInitialState: function() {
        return {
            emailInput: false
        };
    },
    
    emailBooking: function (e) {
        var getOrderUrl = "/booking-note/email";

        var component = React.renderToString(
            <BookingPage order={this.props.order} units={this.props.units}/>
        );

        var data = {
            order: JSON.stringify(this.props.order),
            attachment: component,
            toemail: e.currentTarget[0].value,
            ccemail: e.currentTarget[1].value
        }

        $.post(getOrderUrl, data, function() {
            this.setState({
                emailInput: false
            })
        }.bind(this))
        
        .fail(function () {
            "get units request failed"
        });
    },

    printBooking: function () {
        var originalContents = document.body.innerHTML;
        var printcontent = document.getElementsByClassName("booking-note")[0].innerHTML;
        document.body.innerHTML = printcontent;
        window.print();
        window.close();
        document.body.innerHTML = originalContents;
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