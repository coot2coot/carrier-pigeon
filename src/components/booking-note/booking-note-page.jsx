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

var pLeft = {
    display: "block",
    fontSize: "9pt",
    color: "black",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var pSmall = {
    display: "block",
    fontSize: "10pt",
    color: "#6E6E6E",
    margin: "0",
    paddingTop: "0.5em",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var smallpRight = {
    display: "block",
    fontSize: "10pt",
    color: "#6E6E6E",
    margin: "0",
    paddingTop: "0.5em",
    textAlign: "left",
    fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var smallpCenter = {
  display: "block",
  fontSize: "10pt",
  color: "#6E6E6E",
  margin: "0",
  padding: "0",
  textAlign: "center",
  fontFamily: "Aviner, Verdana, Geneva, sans-serif"
};

var center = {
    textAlign: "center"
};

var footer = {
    position: "relative",
    height: "6em",
    marginTop: "30pt"
};

var companyName = {
    color: "#49A4A5",
    fontFamily: "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    fontWeight: "bolder",
    fontSize: "x-large",
    textAlign: "left",
    padding: "0",
    margin: "0"
};

var header = {
    fontWeight: "bold",
    fontSize: "16pt",
    color: "black",
    padding: "0",
    margin: "0"
};

var contactDetails = {
    float: "right",
    padding: "0",
    margin: "0"
};

var container = {
    height: "95%"
};

var logo = {
  width: "85%",
  paddingLeft: "1em",
  paddingTop: "1.5em",
  margin: "0"
};

var third = {
  marginTop: "3em",
  marginBottom: "6em",
  width: "33%",
  float: "right"
};

var pWrapper = {
  marginTop: "1em"
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

                  <div style={third}>
                      <img style={logo} src="https://cloud.githubusercontent.com/assets/12121805/13642183/5e685e90-e613-11e5-9a59-fc6d72e34dd8.jpeg"/>
                      <p style={smallpCenter}>cootfreight.co.uk </p>
                  </div>

                    <div style={third}>
                        <div style={contactDetails}>
                            <p style={companyName}>Coot Freight Ltd.</p>
                            <p style={smallpRight}> Davenport House, 16 Pepper Street </p>
                            <p style={smallpRight}> London E14 9RP, England </p>
                            <p style={smallpRight}> T: +44 020 7510 9625</p>
                            <p style={smallpRight}> E: info@cootfreight.co.uk</p>
                        </div>
                    </div>

                    <div style={third}>
                        <p style={header}>Booking</p>
                        <p style={header}>{this.props.bookingType}</p>
                        <div style={pWrapper}>
                          <p style={pLeft}><b> Date: </b> { this.props.order.date ? formatDate(this.props.order.date) : "" }</p>
                          <p id="job-number" style={pLeft}><b> Job no: </b> {getJobNumber(this.props.order.job_number, this.props.order.date)}</p>
                        </div>
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
