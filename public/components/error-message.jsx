/** @jsx React.DOM */

module.exports = function(React, Link) {

    return  React.createClass({
        render: function() {
            return (
                <div className="error">
                    <p> * {this.props.message}</p>
                </div>
            )
        }
    })
}