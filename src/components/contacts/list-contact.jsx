var React 	= require('react');
var Contact = require("./contact.jsx");

var contactList = React.createClass({

	getInitialState: function () {

	    return {
	        contacts: this.props.contacts
	    };
	},

	onContactChange: function (key, event) {

		void(this.props.edit && this.props.edit());

  		var name = event.target.name;
  		name     = name.substring(8, name.length);
		var value = event.target.value;
		this.state.contacts[key][name] = value;
  	},

  	addContact: function (key) {

  		this.state.contacts.splice(key + 1, 0, {});
		
		var contacts = this.state.contacts

  		this.setState({
    		contacts: contacts
    	});
  	},

  	removeContact: function (key) {  		

  		if (this.state.contacts.length > 1) {

			this.state.contacts.splice(key, 1);

			var contacts = this.state.contacts;

	  		this.setState({
	    		contacts: contacts
	    	});
	    }
  	},

	render: function () {

		var state 			= this.state;
		var props 			= this.props;
		var onContactChange = this.onContactChange;
		var addContact 		= this.addContact;
		var removeContact 	= this.removeContact;

		return (
			<div>
				{
					state.contacts.map(function  (val, i) {

						var key = new Date().getMilliseconds() + i;

						return <Contact 
									viewing={props.viewing}
									onContactChange={onContactChange}
									addContact={addContact}
									removeContact={removeContact}
									contact={val} 
									keys={i}
									key={key}/>
					})

				}
			</div>
		)
	}
})

module.exports = contactList;