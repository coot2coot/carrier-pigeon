/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var Link   = Router.Link;

var settingsLinks = React.createClass({
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


module.exports = settingsLinks;