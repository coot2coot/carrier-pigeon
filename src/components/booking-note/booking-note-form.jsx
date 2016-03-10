var React       = require('react');
var UnitForm    = require("./booking-note-unit.jsx");

// For emailing as a pdf, inine styling is required.
var text = {
    fontSize: "10pt",
    paddingRight: "15pt",
    float: "right",
    width: "70%",
    minHeight: "28px",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif"
};

var p = {
    color: "black",
    fontSize: "10pt",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif"
};

var tableHeader = {
    textAlign: "center",
    fontSize: "10pt",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif"
};

var bigTableHeader = {
    textAlign: "center",
    fontSize: "10pt",
    height: "30pt",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif"
};

var fullWidth = {
    width: "100%",
    marginBottom: "24px",
    marginTop: "20px",
    float: "left"
};

var header = {
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    marginTop: "15px",
    float: "left"
};

var halfWidth = {
    width: "30%",
    float: "left"
};

var seventhWidth = {
    width: "14%",
    float: "left",
    border: "1px solid black",
    background: "#A3D7DF"
};
var seventhWidthLarge = {
    width: "15.995%",
    float: "left",
    border: "1px solid black",
    background: "#A3D7DF"
};

var center = {
    textAlign: "center"
};

var table = {
  marginTop: "3em",
  width: "100%"
};

var topRow = {
  border: "1px solid black",
  borderCollapse: "collapse",
  background: "#A3D7DF",
  fontFamily: "Avenir, Verdana, Geneva, sans-serif",
  "-webkit-print-color-adjust": "exact",
  textAlign: "center",
  paddingTop: "1em",
  paddingBottom: "1em"
};

var rows = {
    border: "1px solid black",
    borderCollapse: "collapse",
    fontFamily: "Avenir, Verdana, Geneva, sans-serif",
    paddingLeft: "5px",
    paddingTop: "1em",
    paddingBottom: "1em"
};

var bookingNoteForm = React.createClass({

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


              <table style={table}>
                <tr>
                  <td style={topRow}>Collect From:</td>
                  <td style={topRow}>Deliver To:</td>
                </tr>
                <tr>
                  <td style={rows}>{order.collect_from}</td>
                  <td style={rows}>{order.deliver_to}</td>
                </tr>
              </table>

              <table style={table}>
                <tr>
                  <td style={topRow}>Special Instructions:</td>
                </tr>
                <tr>
                  <td style={rows}>{order.special_instructions}</td>
                </tr>
              </table>

            </div>
        )
    }
});


module.exports = bookingNoteForm;
