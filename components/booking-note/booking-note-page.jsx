/** @jsx React.DOM */

var React       = require('react');
var BookingForm = require("./booking-note-form.jsx");

var getJobNumber = function (dbId) {
    var today = new Date();
  
    var id = ("0000" + dbId).slice(-4);
    var mm = ("0" + (today.getMonth()+1)).slice(-2);
    var yy = today.getFullYear().toString().slice(-2);
  
    return yy + mm + id;
}

var bookingNote = React.createClass({
    render: function() {
        return (
            <div className="booking-note container">
                <div>
                    <img src="../../img/logo-full.png" />
                    <hr/> 
                </div>
                <h2>BOOKING NOTE</h2>
                <div className="float-right">
                    <p>Job no: {getJobNumber(this.props.order.job_number)}</p>
                    <p>date: { this.props.order.date.substring(0, 10)}</p>
                </div>
                <div>
                    <BookingForm order={this.props.order} />
                </div>
                <br />
                <hr />
                <div className="half float-left">
                    <p className="small">145-157 St John Street</p>
                    <p className="small">London EC1V 4PW</p>
                    <p className="small">England</p>
                </div>
                <div className="half float-right">
                    <p className="small">Coot Freight Ltd.</p>
                    <p className="small">Registered in England No.07880722</p>
                    <p className="small">VAT No. GB 128 2159 22</p>
                </div>
            </div>
        )
    }
});

module.exports = bookingNote;
