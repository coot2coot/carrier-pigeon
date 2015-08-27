var React = require('react');

var contact = React.createClass({

	getInitialState: function () {

	    return {
	    	contact: this.props.contact
	    };
	},

	render: function () {

		var props = this.props;
		var state = this.state;

		return (

			<div className="row">
				<div className="column-4">
					<p>Contact Name</p>
					<input type="text" name="contact_name" disabled={props.viewing ? true : false} onChange={props.onContactChange.bind(null, props.keys)} defaultValue={state.contact ? state.contact.name : ""}  />
				</div>
				<div className="column-4">
					<p>Telephone</p>
					<input type="text" name="contact_telephone" disabled={props.viewing ? true : false} onChange={props.onContactChange.bind(null, props.keys)} defaultValue={state.contact ? state.contact.telephone : ""}/>
				</div>
				<div className="column-4">
					<p>Email</p>
					<input type="email" name="contact_email" disabled={props.viewing ? true : false} onChange={props.onContactChange.bind(null, props.keys)} defaultValue={state.contact ? state.contact.email : ""}/>
				</div>
				<div className="column-3 push-1 margin-top">
					<button type="button" className="button	blue add-row" disabled={props.viewing ? true : false} onClick={props.addContact.bind(null, props.keys)}>+</button>
					<button type="button" className="button	blue add-row" disabled={props.viewing ? true : false} onClick={props.removeContact.bind(null, props.keys)}>-</button>
				</div>
			</div>
		);
	}

});

module.exports = contact;