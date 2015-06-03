/** @jsx React.DOM */

var React       = require('react');
var BookingForm = require("./booking-note-form.jsx");

var getJobNumber = require("../../lib/format-job-number.js");
var currentDate  = require("../../lib/current-date.js");


// For emailing as a pdf, inine styling is required.
var bookingStyle = {
    width: "595px",
    height: "842px",
    padding: "20px 60px",
    fontFamily: "arial, sans-serif",
    position: "relative"
}
var hr = {
    backgroundColor: "#49A4A5",
    height: "3px",
    width: "100%",
    marginBottom: "5px"
}
var img = {
    height: "35px",
    float: "right",
    margin: "20px 0 10px"
}
var h2 = {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "15px",
    padding: "15px 0 20px"
}

var p = {
    display: "block",
    fontSize: "12px",
    color: "black"
}

var pRight = {
    display: "block",
    fontSize: "9px",
    color: "black",
    textAlign: "right",
    marginBottom: "10px"
}

var pLeft = {
    display: "block",
    fontSize: "9px",
    color: "black",
    marginBottom: "10px"
}

var pSmall = {
    display: "block",
    fontSize: "8px",
    color: "#6E6E6E"
}

var halfRight = {
    float: "right",
    width: "50%",
}

var halfLeft = {
    float: "left",
    width: "50%",
}
var footer = {
    marginTop: "410px"
}

var leftRight = {
    float: "left",
    width: "45%",
    textAlign: "right"
}

var leftLeft = {
    float: "left",
    width: "45%",
    textAlign: "left"
}

var rightRight = {
    float: "right",
    width: "45%",
    textAlign: "right"
}

var rightLeft = {
    float: "left",
    width: "45%",
    textAlign: "left"
}


var bookingNotePage = React.createClass({
    getDefaultProps: function () {
        return {
            order: {},
            units: []  
        };
    },
    render: function() {
        footer.marginTop = parseInt(footer.marginTop) - (18 * this.props.units.length) + "px"
        console.log(footer.marginTop)
        return (
            <div id="form" className="booking-note container" style={bookingStyle}>
                <div>
                    <img style={img} src="http://carrierpigeonfac-se-env.elasticbeanstalk.com/img/logo-full.png" />
                    <hr style={hr}/> 
                </div>

                <h2 style={h2}>Booking Request</h2>
                
                <div style={halfLeft}>
                    <p style={pLeft}><b> Date: </b> { this.props.order.date.substring(0, 10)}</p>
                </div>

                <div style={halfRight}>
                    <p id="job-number" style={pRight}><b> Job no: </b> {getJobNumber(this.props.order.job_number)}</p>
                </div>
                
                <div>
                    <BookingForm order={this.props.order} units={this.props.units}/>
                </div>

                <br />
                <div style={footer}>
                    <hr style={hr}/>

                    <div style={halfLeft}>
                        <div style={leftLeft}>
                            <p style={pSmall}> Davenport House </p>
                            <p style={pSmall}> 16 Pepper Street </p>
                            <p style={pSmall}> London E14 9RP </p>
                            <p style={pSmall}> England </p>
                        </div>
                        <div style={leftRight}>
                            <p style={pSmall}> Tel +44 020 7510 9625 </p>
                            <p style={pSmall}> Fax +44 020 7510 9401 </p>
                            <p style={pSmall}> info@cootfreight.co.uk </p>
                            <p style={pSmall}> www.cootfreight.co.uk </p>
                        </div>
                    </div>
                    <div style={halfRight}>
                        <div style={rightLeft}>
                            <p style={pSmall}> All business is subject to the </p>
                            <p style={pSmall}> current standing conditions </p>
                            <p style={pSmall}> of the BIFA copies of </p>
                            <p style={pSmall}> which are available on request </p>
                        </div>
                        <div style={rightRight}>
                            <p style={pSmall}> Coot Freight Ltd. </p>
                            <p style={pSmall}> Registered in England </p>
                            <p style={pSmall}> No.07880722 </p>
                            <p style={pSmall}> VAT No. GB 128 2159 22 </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = bookingNotePage;
