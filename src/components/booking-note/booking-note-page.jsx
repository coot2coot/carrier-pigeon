var React       = require('react');
var BookingRequestForm = require("./booking-note-form.jsx");
var BookingConfirmationForm = require("./booking-confirmation-form.jsx");


var getJobNumber = require("../../lib/format-job-number.js");
var currentDate  = require("../../lib/current-date.js");
var formatDate   = require("../../lib/format-date.js");


// For emailing as a pdf, inine styling is required.
var bookingStyle = {
    width: "21cm",
    height: "32cm",
    padding: "1cm 1.9cm",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif",
    position: "relative"
};

var hr = {
    backgroundColor: "#49A4A5",
    height: "3px",
    width: "100%",
    marginBottom: "5px",
    fontWeight: "600",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var h2 = {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "18pt",
    padding: "15px 0",
    margin: "0"
};

var p = {
    display: "block",
    fontSize: "11pt",
    color: "black",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var pRight = {
    display: "block",
    fontSize: "11pt",
    color: "black",
    textAlign: "right",
    marginBottom: "10px",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var pLeft = {
    display: "block",
    fontSize: "11pt",
    color: "black",
    marginBottom: "10px",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var pSmall = {
    display: "block",
    fontSize: "10pt",
    color: "#6E6E6E",
    margin: "0",
    padding: "0",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var smallpRight = {
    display: "block",
    fontSize: "10pt",
    color: "#6E6E6E",
    margin: "0",
    padding: "0",
    textAlign: "right",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var halfRight = {
    float: "right",
    width: "50%",
    textAlign: "right"
};

var halfLeft = {
    float: "left",
    width: "50%",
    marginTop: "12pt"
};
var center = {
    textAlign: "center"
};

var footer = {
    position: "relative",
    height: "6em",
    marginTop: "30pt"
};

var logoImg = {
    height: "60pt",
    float: "right",
    marginTop: "20px"
};

var companyName = {
    color: "#49A4A5",
    fontFamily: "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    fontWeight: "bolder",
    fontSize: "x-large",
    textAlign: "right"
};

var logoText = {
    height: "64pt",
    marginTop: "12pt"
};

var header = {
    fontWeight: "bold",
    fontSize: "16pt",
    color: "black"
};

var contactDetails = {
    marginTop: "12pt",
    float: "right"
};

var p = {
    display: "inline-block",
    fontSize: "11pt",
    color: "#484848",
    margin: "0",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var container = {
    height: "95%"
};

var bookingNotePage = React.createClass({

    getDefaultProps: function () {
        return {
            order: {},
            units: []
        };
    },

    renderForm: function () {
      if (this.props.bookingType === 'Request') {
        return <BookingRequestForm order={this.props.order} units={this.props.units}/>
      } else {
        return <BookingConfirmationForm order={this.props.order} units={this.props.units}/>
      }
    },

    render: function() {

        return (
            <div id="form" className="booking-note container" style={bookingStyle}>
                <div style={container}>
                    <div>
                        <div style={contactDetails}>
                            <p style={companyName}>Coot Freight Ltd.</p>
                            <p style={smallpRight}> Davenport House, 16 Pepper Street </p>
                            <p style={smallpRight}> London E14 9RP, England </p>
                            <p style={smallpRight}> Tel +44 020 7510 9625</p>
                            <p style={smallpRight}> www.cootfreight.co.uk </p>
                        </div>
                    </div>

                    <div style={halfLeft}>
                        <p style={header}>Booking</p>
                        <p style={header}>{this.props.bookingType}</p>
                        <p style={pLeft}><b> Date: </b> { this.props.order.date ? formatDate(this.props.order.date) : "" }</p>
                        <p id="job-number" style={pLeft}><b> Job no: </b> {getJobNumber(this.props.order.job_number, this.props.order.date)}</p>
                    </div>

                    <div>
                        {this.renderForm()}
                    </div>

                    <br />

                </div>
                <div style={footer}>
                    <div style={center}>
                        <p style={pSmall}>All business is subject to the current standing conditions of the BIFA copies </p>
                        <p style={pSmall}>copies of which are available on request </p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = bookingNotePage;
