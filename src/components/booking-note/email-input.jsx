/** @jsx React.DOM */

var React  = require('react');
var ContactList = require('../orders/contact-list.jsx')

var EmailInput = React.createClass({

    render: function() {
        return (
            <div className="overlay">
			<div className="column-6 push-5 model-generic model-middle email">
                    <div className="panel-header">
                        <h3>Enter an email</h3>
                        <a className="close" onClick={this.props.closeView}>x</a>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.props.sendEmail}>
                        <ContactList property="email" placeholder="email@example.com" contactType="email" email={true} />
                            <input type="submit" className="button charcoal" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = EmailInput;