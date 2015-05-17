/** @jsx React.DOM */

// var markup = React.renderComponentToString(
//     Item({ initialCount: 7 })
// );
// res.render('template', {
//     markup: markup
// });

var React  = require('react');

var bookingNote = React.createClass({
    emailBooking: function () {
        var getOrderUrl = "/order/get/" + this.props.params.job_no;

        $.post(getOrderUrl, data, function(result) {
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