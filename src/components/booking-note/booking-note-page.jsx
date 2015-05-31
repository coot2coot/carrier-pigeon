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
    fontSize: "15px",
    padding: "0"
}

var p = {
    display: "block",
    fontSize: "12px",
    color: "black"
}

var pRight = {
    display: "block",
    fontSize: "11px",
    color: "black",
    textAlign: "right"
}

var pLeft = {
    display: "block",
    fontSize: "9px",
    color: "black"
}

var pSmall = {
    display: "block",
    fontSize: "8px",
    color: "#6E6E6E"
}

var halfRight = {
    paddingLeft: "20px",
    float: "right",
    width: "50%",
    textAlign: "right",
    margin: "20px 0"
}

var halfLeft = {
    paddingRight: "10px",
    float: "left",
    width: "50%",
    margin: "20px 0",
    textAlign: "left"
}

var bookingNote = React.createClass({
    render: function() {
        return (
            <div id="form" className="booking-note container" style={bookingStyle}>
                <div>
                    <img style={img} src="http://carrierpigeonfac-se-env.elasticbeanstalk.com/img/logo-full.png" />
                    <hr style={hr}/> 
                </div>
                <h2 style={h2}>Booking Request</h2>
                <div style={halfLeft}>
                    <p style={pLeft}><b> date: </b> { this.props.order.date.substring(0, 10)}</p>
                </div>
                <div style={halfRight}>
                    <p style={pRight}><b> Job no: </b> {getJobNumber(this.props.order.job_number)}</p>
                </div>
                <div>
                    <BookingForm order={this.props.order} />
                </div>
                <br />
                <hr style={hr}/>
                <div style={halfLeft}>
                    <div style={halfLeft}>
                        <p style={pSmall}> Davenport House </p>
                        <p style={pSmall}> 16 Pepper Street </p>
                        <p style={pSmall}> London E14 9RP </p>
                        <p style={pSmall}> England </p>
                    </div>
                    <div style={halfRight}>
                        <p style={pSmall}> Tel +44 020 7510 9625 </p>
                        <p style={pSmall}> Fax +44 020 7510 9401 </p>
                        <p style={pSmall}> info@cootfreight.co.uk </p>
                        <p style={pSmall}> www.cootfreight.co.uk </p>
                    </div>
                </div>
                <div style={halfRight}>
                    <div style={halfLeft}>
                        <p style={pSmall}> All business is subject to the </p>
                        <p style={pSmall}> current standing conditions </p>
                        <p style={pSmall}> of the BIFA copies of </p>
                        <p style={pSmall}> which are available on request </p>
                    </div>
                    <div style={halfRight}>
                        <p style={pSmall}> Coot Freight Ltd. </p>
                        <p style={pSmall}> Registered in England </p>
                        <p style={pSmall}> No.07880722 </p>
                        <p style={pSmall}> VAT No. GB 128 2159 22 </p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = bookingNote;
