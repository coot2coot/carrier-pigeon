/** @jsx React.DOM */

var React 	= require('react');

var error = React.createClass({
    render: function() {
        return (
            <div className= 'error file'>
                <p> * {this.props.message}</p>
            </div>
        )
    }
})

module.exports = error;