var React  			= require('react');
var Error 			= require("../error-message.jsx");
var CreateContact 	= require('./add-contact.jsx');
var ViewContact 	= require("./view-contact.jsx");
var Header 			= require("../header/header.jsx");
var SearchBox 		= require("../orders/search-box.jsx");
var ReminderIcon	= require("./reminder-svg.jsx");

var getWeek			= require("../../lib/get-week.js");
var groupBy			= require("../../lib/group-by.js");


var removeBlueBorder = {
	'outline':'0'
};

var contactsPage = React.createClass({

	getInitialState: function () {

      return {
        contacts:[],
				filteredContacts: [],
        error: false,
        creatingContact: false
      };
    },

    componentDidMount: function () {

		var getContactUrl = "/contacts/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getContactUrl = "/contacts/get/nocache";
		}

	    $.get(getContactUrl, function (result) {
	    	if (result !== "") {
	    		var contact = groupBy(getWeek.inRange(JSON.parse(result)),'contact_id');

					var filterReminders = getWeek.filter(contact);
					var orderAlphabetical = filterReminders.sort(function (a, b) {

						 if (a[0].company_name === null) {
								 return 1;
						 } else if (b[0].company_name === null) {
								 return -1;
						 } else {
								return a[0].company_name.toLowerCase() < b[0].company_name.toLowerCase() ? -1 : 1 ;
						 }
					});

		      	if (this.isMounted()) {
		        	this.setState({
		          		contacts : contact,
						filteredContacts: orderAlphabetical
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {

	    	"get request failed";
	    });
	},

	orderByReminders: function () {

		var ordered = getWeek.filter(this.state.contacts);
		var filteredContact = ordered.sort(function (a, b) {

			 if (a[0].company_name === null) {
					 return 1;
			 } else if (b[0].company_name === null) {
					 return -1;
			 } else {
					return a[0].company_name.toLowerCase() < b[0].company_name.toLowerCase() ? -1 : 1 ;
			 }
		});

		this.setState({
			filteredContacts: filteredContact
		});
	},

	uniq: function (a) {

	    var seen = {};

	    return a.filter( function (contact) {

	        return seen.hasOwnProperty(contact[0].contact_id) ? false : (seen[contact[0].contact_id] = true);
	    });
	},

	alphabeticalOrder: function () {

		var contacts = this.state.contacts.sort(function (a, b) {

			 if (a[0].company_name === null) {
					 return 1;
			 } else if (b[0].company_name === null) {
					 return -1;
			 } else {
						return a[0].company_name.toLowerCase() < b[0].company_name.toLowerCase() ? -1 : 1 ;
			 }
		});

		this.setState({
			filteredContacts: contacts
		});
	},

	getSearchedContacts: function (value) {

		var getUrl = "/search/contacts/" + value;
		$.get(getUrl,function (result) {

			if (result === "error") {
				this.setState({
					error: true
				});
			} else {
				var contact = groupBy(getWeek.inRange(JSON.parse(result)),'contact_id');
				var uniqContact = this.uniq(contact);
				this.setState({
					error: false
				});
				this.setState({
				    filteredContacts : uniqContact
				});
			}
		}.bind(this))
		.fail( function () {

			"get searchfailed";
		});
	},

    onCloseComponent: function () {

		this.setState({
			creatingContact: null,
			selectedContact: null,
			selectedReminder: null
		});
	},

    addContact: function () {

		this.setState({
			creatingContact: true
		});
	},

	reminderHandler: function (item) {

		this.setState({
			selectedReminder: item
		});
	},

	contactHandler: function (item) {

		this.setState({
			selectedContact: item
		});
	},

	setUser: function (user) {

		this.setState({
			user: user
		});
	},

	render: function () {

		var contactHandler 		= this.contactHandler;
		var reminderHandler 	= this.reminderHandler;
		var alphabeticalOrder 	= this.alphabeticalOrder;
		var orderByReminders	= this.orderByReminders;
		var addContact 			= this.addContact;

		return (

			<div>
				<Header setUser={this.setUser}/>
				<div className="column-14 push-1 model-generic">
					<div>
						{(this.state.error
                            ? <Error message="Sorry, that search returned no results. Try another search." />
                            : <p className="display-none"></p>
                        )}
                    </div>
					<div className="panel-header" >
						<h3>Contacts</h3>
						<button data-tooltip="Add contact" style={removeBlueBorder} className="button add blue" onClick={addContact}>+</button>
						<button data-tooltip="Order by reminders" style={removeBlueBorder} className="button add blue" onClick={orderByReminders}>R</button>
						<button data-tooltip="Order alphabetically" style={removeBlueBorder} className="button add blue" onClick={alphabeticalOrder}>Abc</button>
						<SearchBox getorders= {this.getSearchedContacts} />
					</div>
					<div className="panel-body table-head">
						<table className="table table-full">
							<th>
								<h5>Company Name</h5>
							</th>
							<th>
								<h5>Category</h5>
							</th>
							<th>
								<h5>City</h5>
							</th>
							<th>
								<h5>Post Code</h5>
							</th>
							<th>
								<h5>Reminders</h5>
							</th>
						</table>
					</div>
					<div className="panel-body table-responsive scroll">
						<table className="table table-full">
							<tbody>

						  		{this.state.contacts !== 0
							  		? this.state.filteredContacts.map(function (contact, i) {

							  			var cont = contact.sort(function (a, b) {

							  				return b.week - a.week
										})


								        return <tr key={i}>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont)}>
								            				<p>{cont[0] ? cont[0].company_name : ''}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont)}>
								            				<p>{cont[0] ? cont[0].category : ''}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont)}>
								            				<p>{cont[0] ? cont[0].city : ''}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont)}>
								            				<p>{cont[0] ? cont[0].postcode : ''}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a>
															<p className='align-center'>
																{(cont[0] && cont[0].week && cont[0].week === 1)
											            			? <ReminderIcon onclick={contactHandler.bind(null, cont)} classname ="present" />
											            			: (cont[0] && cont[0].week && cont[0].week === 2)
											            			?<ReminderIcon onclick={contactHandler.bind(null, cont)} classname ="urgent" />
											            			:<ReminderIcon onclick={contactHandler.bind(null, cont)} />
											            		}
															</p>
								            			</a>
								            		</td>
												</tr>
							    	})
									: <tr></tr>
								}

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
