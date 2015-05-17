/** @jsx React.DOM */

var React       = require('react');
var BookingPage = require("./booking-note-page.jsx");
var EmailInput  = require("./email-input.jsx");

var bookingNote = React.createClass({
    getInitialState: function() {
        return {
            emailInput: false
        };
    },
    emailBooking: function (e) {
        var getOrderUrl = "/booking-note/email";

        var component = React.renderToString(
            <BookingPage order={this.props.order} />
        );

        var data = {
            attachment: component,
            email: e.currentTarget[0].value,
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

    downloadBooking: function () {
       var pdf = new jsPDF('p', 'pt', 'letter');
       var source = document.getElementById('form');
       console.log(source)
       var handler = {
            '#bypassme': function(element, renderer){
                return true
            }
       };
       var margins = {
            top: 50,
            left:60,
            width: 545
       };

       pdf.fromHTML(
            source,
            margins.left,
            margins.top,
            {
                'width' : margins.width,
                'elementHandlers': handler
            },
            function(dispose){
                pdf.save('forms')
            }
        )
    },
    printBooking: function () {

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

                        <a className="button blue" onClick={this.downloadBooking}>
                            Download
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


module.exports = bookingNote;