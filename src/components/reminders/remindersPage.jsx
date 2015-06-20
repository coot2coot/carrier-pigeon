/** @jsx React.DOM */

var React  			= require('react');
var Error 			= require("../error-message.jsx");
var Header 			= require("../header/header.jsx");
var CreateReminder	= require("./add-reminder.jsx");
var ViewReminder	= require("./view-reminder.jsx");

var week			= require("../../lib/getWeek.js")

var remindersPage = React.createClass({
	getInitialState: function() {
      return {
        error: false,
        creatingReminder: false,
        selectedReminder: null
      };
    },
    addReminder: function () {
		this.setState({
			creatingReminder: true
		})
	},
	reminderHandler: function (item) {
		this.setState({
			selectedReminder: item
		})
	},
	onCloseComponent: function () {
		this.setState({
			creatingReminder: false,
			selectedReminder: null
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

		var getReminderUrl = "/reminders/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getReminderUrl = "/reminders/get/nocache"
		}

	    $.get(getReminderUrl, function(result) {
	    	if(result !== ""){
		    	var reminder = week(JSON.parse(result))
		    	var sortReminder = reminder.sort(function(a,b){
				  return new Date(a.date) - new Date(b.date);
				});;

		      	if (this.isMounted()) {
		        	this.setState({
		          		reminders : sortReminder
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},
	render: function() {
		var reminderHandler = this.reminderHandler;
		return (
			<div >
				<Header/>
				<div className="column-14 push-1 model-generic">

					<div className="panel-header" >
						<h3>Reminders</h3>
						<button data-tooltip="Add reminder" className="button add blue" onClick={this.addReminder} >+</button>
					</div>
					<div className="panel-body table-head">
						<table className="table table-full">
							<th>
								<h5>Contact</h5>
							</th>
							<th>
								<h5>State</h5>
							</th>
						</table>
					</div>
					<div className="panel-body table-responsive scroll">
						<table className="	table table-full">
							<tbody>
						  		{this.state.reminders
							  		? this.state.reminders.map(function (reminder, i) {
								        return <tr>
								            		<td key={i + "first"}>
								            			<a  onClick={reminderHandler.bind(null, reminder)}>
								            				<p>{reminder.contact}</p>
								            			</a>
								            		</td>
								            		{(reminder.week === "present")
								            			? <td className = "green"  key={i + "second"}><a><p>This Week</p></a></td>
								            			: (reminder.week === "urgent")
								            			?<td className = "red"  key={i + "second"}><a><p>Late</p></a></td>
								            			: <td></td>
								            		}
								            	</tr>
								            		
									})
									: <tr><td></td></tr>
							    }
							</tbody>
						</table>
					</div>
				</div>
				{this.state.creatingReminder
                    ? <CreateReminder contacts={this.state.contacts} closeView={this.onCloseComponent} />
                    : this.state.selectedReminder
                    ? <ViewReminder contacts= {this.state.contacts} reminder= {this.state.selectedReminder} closeView={this.onCloseComponent}/>
                    :<p></p>
                }               
			</div>
		);
	}
})

module.exports = remindersPage;