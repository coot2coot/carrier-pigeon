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
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    position: "relative"
};

var pLeft = {
    display: "block",
    fontSize: "8pt",
    color: "black",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    lineHeight: "1"
};

var pSmall = {
    display: "block",
    fontSize: "10pt",
    color: "#6E6E6E",
    margin: "0",
    paddingTop: "0.5em",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    textAlign: "center"
};

var smallpRight = {
    display: "block",
    fontSize: "8pt",
    color: "#6E6E6E",
    margin: "0",
    lineHeight: "1",
    paddingTop: "0.5em",
    textAlign: "left",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    paddingLeft: "75px"
};

var smallpCenter = {
  display: "block",
  fontSize: "8pt",
  color: "#6E6E6E",
  margin: "0",
  padding: "0",
  textAlign: "center",
  fontFamily: "Avenir, Verdana, Geneva, sans-serif"
};

var footer = {
    position: "absolute",
    bottom: "15px",
    right: "0",
    left: "0"
};

var companyName = {
    color: "#49A4A5",
    fontFamily: "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    fontWeight: "bolder",
    textAlign: "left",
    padding: "0",
    margin: "0",
    paddingLeft: "75px"
};

var header = {
    fontWeight: "bold",
    fontSize: "20pt",
    color: "black",
    padding: "0",
    margin: "0",
    fontFamily: "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif"
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
  width: "95%",
  paddingLeft: "1em",
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
                            <p style={smallpRight}> 50 Cambridge Road,</p>
                            <p style={smallpRight}> Barking, IG11 8FG </p>
                            <p style={smallpRight}> T: +44 020 8594 75 33</p>
                            <p style={smallpRight}> E: info@cootfreight.co.uk</p>
                        </div>
                    </div>

                    <div style={third}>
                        <p style={header}>Booking {this.props.bookingType}</p>
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
                  <p style={pSmall}>All business is subject to the current standing conditions of the BIFA copies of which are available on request </p>
                </div>
            </div>
        )
    }
});

module.exports = bookingNotePage;
