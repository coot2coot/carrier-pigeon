/** @jsx React.DOM */

var React  			= require('react');
var Error 			= require("../error-message.jsx");
var CreateContact 	= require('./add-contact.jsx');
var ViewContact 	= require("./view-contact.jsx");
var Header 			= require("../header/header.jsx");
var SearchBox 		= require("../orders/search-box.jsx");
var ViewReminders	= require("../reminders/view-reminder.jsx");

var getWeek			= require("../../lib/getWeek.js");
var groupBy			= require("../../lib/groupBy.js");
	
var contactsPage = React.createClass({

	getInitialState: function () {

      return {
        contacts:[],
        error: false,
        creatingContact: false
      };
    },

    componentDidMount: function () {

		var getContactUrl = "/contacts/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getContactUrl = "/contacts/get/nocache"
		}

	    $.get(getContactUrl, function (result) {

	    	if (result !== "") {
	    		var contact = groupBy(getWeek(JSON.parse(result)),'contact_id');

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

	orderByReminders: function () {

		var ordered = this.state.contacts.sort(function (a, b) {

			a.sort( function (c, d) {

				return d.week - c.week
			})

			b.sort( function (c, d) {

				return d.week - c.week
			})

			return b[0].week - a[0].week

		});

		this.setState({
			contacts: ordered
		});
	},

	uniq: function (a) {

	    var seen = {};

	    return a.filter( function (contact) {

	        return seen.hasOwnProperty(contact[0].contact_id) ? false : (seen[contact[0].contact_id] = true);
	    });
	},
	
	getSearchedContacts: function (value) {

		var getUrl = "/search/contacts/" + value;
		$.get(getUrl,function (result) {

			if (result === "error") {
				this.setState({
					error: true
				})
			} else {
				var contact = groupBy(getWeek(JSON.parse(result)),'contact_id');	
				var uniqContact = this.uniq(contact);
				this.setState({
					error: false
				})
				this.setState({
				    contacts : uniqContact
				});
			}				
		}.bind(this))
		.fail( function () {

			"get searchfailed"
		});
	},

    onCloseComponent: function () {
		this.setState({
			creatingContact: null,
			selectedContact: null,
			selectedReminder: null
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

	reminderHandler: function (item) {
		this.setState({
			selectedReminder: item
		})
	},

	render: function() {
		var contactHandler = this.contactHandler;
		var reminderHandler = this.reminderHandler;
		return (

			<div>
				<Header />
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
						<button data-tooltip="Order by reminders" className="button add blue" onClick={this.orderByReminders}>R</button>
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
							  		? this.state.contacts.map(function (contact, i) {

							  			var cont = contact.sort(function (a, b) {
							  				return b.week - a.week
										})
										
								        return <tr key={i}>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont[0])}>
								            				<p>{cont[0].company_name}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont[0])}>
								            				<p>{cont[0].category}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont[0])}>
								            				<p>{cont[0].city}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a onClick={contactHandler.bind(null, cont[0])}>
								            				<p>{cont[0].postcode}</p>
								            			</a>
								            		</td>
								            		<td>
								            			<a>
															<p className='align-center'>
																<svg onClick= {reminderHandler.bind(null, contact)} className="bell" viewBox="0 0 88 72" >
																	{(cont[0].week && cont[0].week === 1)
												            			? <path className="present" d="M71.5,38.184h-3.291l-6.213-21.879c-1.367-4.816-5.951-8.693-10.904-9.514C50.91,3.02,47.812,0,43.996,0c-3.812,0-6.91,3.018-7.092,6.787c-4.957,0.822-9.539,4.697-10.908,9.514l-6.211,21.883h-3.289l-4.498,15.85h19.251H36h15.994h3.963h20.041L71.5,38.184z M40.975,6.611C41.229,5.143,42.455,4,43.996,4c1.543,0,2.77,1.143,3.025,2.615L40.975,6.611z"/>
												            			: (cont[0].week && cont[0].week === 2)
												            			?<path className="urgent" d="M71.5,38.184h-3.291l-6.213-21.879c-1.367-4.816-5.951-8.693-10.904-9.514C50.91,3.02,47.812,0,43.996,0c-3.812,0-6.91,3.018-7.092,6.787c-4.957,0.822-9.539,4.697-10.908,9.514l-6.211,21.883h-3.289l-4.498,15.85h19.251H36h15.994h3.963h20.041L71.5,38.184z M40.975,6.611C41.229,5.143,42.455,4,43.996,4c1.543,0,2.77,1.143,3.025,2.615L40.975,6.611z"/>
												            			:<path d="M71.5,38.184h-3.291l-6.213-21.879c-1.367-4.816-5.951-8.693-10.904-9.514C50.91,3.02,47.812,0,43.996,0c-3.812,0-6.91,3.018-7.092,6.787c-4.957,0.822-9.539,4.697-10.908,9.514l-6.211,21.883h-3.289l-4.498,15.85h19.251H36h15.994h3.963h20.041L71.5,38.184z M40.975,6.611C41.229,5.143,42.455,4,43.996,4c1.543,0,2.77,1.143,3.025,2.615L40.975,6.611z"/>
												            		}
																</svg>
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
                    : this.state.selectedReminder
                    ? <ViewReminders reminder= {this.state.selectedReminder} closeView={this.onCloseComponent}/>
                    :<p></p>
                )}
                
			</div>
		);
	}
})

module.exports = contactsPage;
