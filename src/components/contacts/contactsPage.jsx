/** @jsx React.DOM */

var React  			= require('react');
var Error 			= require("../error-message.jsx");
var CreateContact 	= require('./add-contact.jsx');
var ViewContact 	= require("./view-contact.jsx");
var Header 			= require("../header/header.jsx");
var SearchBox 		= require("../orders/search-box.jsx");
	
var contactsPage = React.createClass({
	getInitialState: function() {
      return {
        contacts: [
            {
            	name : "birnard",
            	number: "012345",
            }
        ],
        error: false,
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
	uniq: function (a) {
	    var seen = {};
	    return a.filter(function(contact) {
	        return seen.hasOwnProperty(contact.contact_id) ? false : (seen[contact.contact_id] = true);
	    });
	},
	getSearchedContacts: function (value) {
		var getUrl = "/search/contacts/" + value;
		$.get(getUrl,function (result) {	
			if(result === "error"){
				this.setState({
					error: true
				})
			}else{		
				var contact = JSON.parse(result);
				var uniqContact = this.uniq(contact)
				this.setState({
					error: false
				})
				this.setState({
				    contacts : uniqContact
				});
			}				
		}.bind(this))
		.fail(function(){
			"get searchfailed"
		});
	},

    onCloseComponent: function () {
		this.setState({
			creatingContact: false,
			selectedContact: false
		})
	},

    addContact: function () {
		this.setState({
			creatingContact: true
		})
	},
	contactHandler: function (item) {
		this.setState({
			selectedContact: item
		})
	},

	render: function() {
		var contactHandler = this.contactHandler;
		return (

			<div>
				<Header/>
				<div className="column-14 push-1 model-generic">
					<div>
						{(this.state.error
                            ? <Error message="Sorry, that search returned no results. Try another search." />
                            : <p className="display-none"></p>
                        )}
                    </div>
					<div className="panel-header" >
						<h3>Contacts</h3>
						<button data-tooltip="Add contact" className="button add blue" onClick={this.addContact}>+</button>
						<SearchBox getorders= {this.getSearchedContacts} />
					</div>
					<div className="panel-body table-responsive scroll">
						<table className="table table-full">
							<th>
								<h5>Company Name</h5>
							</th>
							<tbody>

						  		{ this.state.contacts.map(function (contact, i) {
							        return <tr>
							            		<td key={i + "first"}>
							            			<a onClick={contactHandler.bind(null, contact)}>
							            				<p>{contact.company_name}</p>
							            			</a>
							            		</td>
											</tr>
							    })}

							</tbody>
						</table>
					</div>
				</div>

				{(this.state.creatingContact
                    ? <CreateContact contact={this.state.contacts} closeView={this.onCloseComponent} />
                    : this.state.selectedContact
                    ? <ViewContact contact= {this.state.selectedContact} closeView={this.onCloseComponent}/>
                    :<p></p>
                )}
                
			</div>
		);
	}
})

module.exports = contactsPage;
