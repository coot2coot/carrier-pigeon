var React       = require('react');
var UnitForm    = require("./booking-note-unit.jsx");

// For emailing as a pdf, inine styling is required.
var greeting = {
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    paddingTop: '0.5em',
    fontSize: '14px',
    margin: "0"
};

var fullWidth = {
    width: "100%",
    marginBottom: "24px",
    float: "left"
};

var thankYou = {
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    marginTop: "5em",
    float: "left"
};

var table = {
  width: "100%"
};

var topRow = {
  border: "1px solid black",
  borderCollapse: "collapse",
  background: "#A3D7DF",
  "-webkit-print-color-adjust": "exact",
  fontFamily: "Avenir, Verdana, Geneva, sans-serif",
  textAlign: "center",
  paddingTop: "1em",
  paddingBottom: "1em"
};

var bookingConfirmationForm = React.createClass({

    getDefaultProps: function () {
        return {
            units: []
        };
    },

    render: function() {

        var order               = this.props.order;
        var instructionsArray   = [];

        if (order.special_instructions && (order.special_instructions !== undefined)) {
            instructionsArray = order.special_instructions.split('\n');
        }

        return (
            <div>

              <div style={fullWidth}>
                <h4 style={greeting}>Dear Sir/Madam,</h4>
                <h4 style={greeting}>Coot Freight hereby confirm your order as follows:</h4>
              </div>

              <table style={table}>
                <tr>
                  <td style={topRow}>Collection Date:</td>
                  <td style={topRow}>Collection Time:</td>
                  <td style={topRow}>Collection Ref:</td>
                  <td style={topRow}>Unit Type:</td>
                  <td style={topRow}>No of Packages:</td>
                  <td style={topRow}>Gross Weight:</td>
                  <td style={topRow}>Commodity:</td>
                </tr>
                  {
                      this.props.units.sort(function (a,b) {
                          return new Date(a.unit_loading_date) - new Date(b.unit_loading_date)
                      }).map(function (unit) {

                          return <UnitForm unit={unit} />
                      })
                  }
              </table>

              <div style={thankYou}>Thank you for booking with Coot Freight</div>

            </div>
        )
    }
});


module.exports = bookingConfirmationForm;
