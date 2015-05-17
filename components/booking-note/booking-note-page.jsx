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

var bookingStyle = {
    width: "595px",
    height: "842px",
    padding: "20px 60px",
    fontFamily: "arial, sans-serif"
}
var hr = {
    backgroundColor: "#49A4A5",
    height: "3px",
    width: "100%"
}
var img = {
    height: "54px",
    float: "right",
    margin: "8px"
}
var h2 = {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "20px"
}

var p = {
    display: "block",
    fontSize: "12px",
    color: "black"
}

var pDate = {
    display: "block",
    fontSize: "12px",
    color: "black",
    textAlign: "right"
}

var pSmall = {
    display: "block",
    fontSize: "11px",
    color: "#6E6E6E"
}

var halfRight = {
    float: "right",
    width: "50%",
    textAlign: "right"
}

var halfLeft = {
    float: "left",
    width: "50%"
}

var bookingNote = React.createClass({
    render: function() {
        return (
            <div className="booking-note container" style={bookingStyle}>
                <div>
                    <img style={img} src="http://carrierpigeonfac-se-env.elasticbeanstalk.com/img/logo-full.png" />
                    <hr style={hr}/> 
                </div>
                <h2 style={h2}>BOOKING NOTE</h2>
                <div className="float-right">
                    <p style={pDate}>Job no: {getJobNumber(this.props.order.job_number)}</p>
                    <p style={pDate}>date: { this.props.order.date.substring(0, 10)}</p>
                </div>
                <div>
                    <BookingForm order={this.props.order} />
                </div>
                <br />
                <hr style={hr}/>
                <div style={halfLeft}>
                    <p style={pSmall}>145-157 St John Street</p>
                    <p style={pSmall}>London EC1V 4PW</p>
                    <p style={pSmall}>England</p>
                </div>
                <div style={halfRight}>
                    <p style={pSmall}>Coot Freight Ltd.</p>
                    <p style={pSmall}>Registered in England No.07880722</p>
                    <p style={pSmall}>VAT No. GB 128 2159 22</p>
                </div>
            </div>
        )
    }
});

module.exports = bookingNote;
