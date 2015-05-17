/** @jsx React.DOM */

var React  = require('react');

var Header         = require("../header/header.jsx");
// If the buttons don't work... If email: Please double check your email address and try again.
// If save/print doesn't work... sorry, there has been an internal error. Try again at a late point.
var Error          = require("../error-message.jsx");
var BookingOptions = require("./booking-note-options.jsx");
var BookingPage    = require("./booking-note-page.jsx");

var getJobNumber = function (dbId) {
    var today = new Date();
  
    var id = ("0000" + dbId).slice(-4);
    var mm = ("0" + (today.getMonth()+1)).slice(-2);
    var yy = today.getFullYear().toString().slice(-2);
  
    return yy + mm + id;
}

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
                    order : order,
                });
            }
        }.bind(this))
        .fail(function () {
            "get units request failed"
        });
    },
    convertPdf: function () {
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

    render: function() {
        return (
            <div>
                <Header/>

                <BookingOptions order={this.state.order} />
                <BookingPage order={this.state.order} />
            </div>
        )
    }
});

module.exports = bookingNote;
