/** @jsx React.DOM */

var React  			= require('react');
var Error 			= require("../error-message.jsx");
var Header 			= require("../header/header.jsx");
var CreateReminder	= require("./add-reminder.jsx");

var remindersPage = React.createClass({
	getInitialState: function() {
      return {
        error: false,
        creatingReminder: false
      };
    },
    addReminder: function () {
		this.setState({
			creatingReminder: true
		})
	},
    getContacts : function () {
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
	componentDidMount: function() {
		this.getContacts();

		var getContactUrl = "/reminders/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getContactUrl = "/reminders/get/nocache"
		}

	    $.get(getContactUrl, function(result) {
	    	if(result !== ""){
		    	var reminder = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		reminders : reminder
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},
	render: function() {
		return (
			<div >
				<Header/>
				<div className="column-14 push-1 model-generic">

					<div className="panel-header" >
						<h3>Reminders</h3>
						<button data-tooltip="Add reminder" className="button add blue" onClick={this.addReminder} >+</button>
					</div>
					<div className="panel-body table-responsive scroll">
						<table className="table table-full">
							<th>
								<h5>Contact</h5>
							</th>
							<th>
								<h5>State</h5>
							</th>
							<tbody>

						  		{this.state.contacts
							  		? this.state.contacts.map(function (contact, i) {
								        return <tr>
								            		<td key={i + "first"}>
								            			<a >
								            				<p>{contact.company_name}</p>
								            			</a>
								            		</td>
								            		<td key={i + "second"}>
								            			<a >
								            				<p></p>
								            			</a>
								            		</td>
												</tr>
										})
									: <p></p>
							    }
							</tbody>
						</table>
					</div>
				</div>
				{this.creatingReminder
                    ? <CreateReminder contacts={this.state.contacts} closeView={this.onCloseComponent}/>
                    : <p></p>
                }               
			</div>
		);
	}
})

module.exports = remindersPage;