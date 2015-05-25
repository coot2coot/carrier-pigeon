/** @jsx React.DOM */

var React  			= require('react');
var CreateContact 	= require('./add-contact.jsx');
var Header 			= require("../header/header.jsx");

var contactsPage = React.createClass({
	getInitialState: function() {
      return {
        contacts: [
            {
            	name : "birnard",
            	number: "012345",
            }
        ],
        creatingContact: false
      };
    },
    componentDidMount: function() {
		var getContactUrl = "/contacts/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getContactUrl = "/contacts/get/nocache"
		}

	    $.get(getContactUrl, function(result) {
	    	if(result !== ""){
		    	var contact = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		contacts : contact
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},

    onCloseComponent: function () {
		this.setState({
			creatingContact: false,
		})
	},

    addContact: function () {
		this.setState({
			creatingContact: true
		})
	},

	render: function() {
		var contactHandler = this.contactHandler;
		return (

			<div>
				<Header/>
				<div className="column-14 push-1 model-generic">
					<div className="panel-header" >
						<h3>Contacts</h3>
						<button data-tooltip="Add contact" className="button add blue" onClick={this.addContact}>+</button>
					</div>
					<div className="panel-body table-responsive scroll">
						<table className="table table-full">
							<th>
								<h5>Contact Name</h5>
							</th>
							<th>
								<h5>Contact No.</h5>
							</th>
							<tbody>

						  		{ this.state.contacts.map(function (contact, i) {
							        return <tr>
							            		<td key={i + "first"}>
							            			
							            				<p>{contact.name}</p>
							            		</td>
												<td key={i + "second"}>
													
														<p>{contact.telephone}</p>
												</td>
											</tr>
							    })}

							</tbody>
						</table>
					</div>
				</div>

				{(this.state.creatingContact
                    ? <CreateContact contact={this.state.contacts} closeView={this.onCloseComponent} />
                    : <p></p>
                )}
                
			</div>
		);
	}
})

module.exports = contactsPage;
