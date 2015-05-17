/** @jsx React.DOM */


// TODO: put the buttons:
//  Print
// Save/download
// Email

var React  = require('react');

var bookingNote = React.createClass({
    render: function() {
        return (
            <links>
                <Link to="settings" query={{}}>
                    <p>Update your details</p>
                </Link>

                {( this.props.admin
                    ? <Link to="AddUnitType" query={{}}><p>Add Unit Type</p></Link>
                    : <p></p>
                )}
                
            </links>
        )
    }
});


module.exports = bookingNote;