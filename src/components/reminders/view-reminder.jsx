/** @jsx React.DOM */

var React = require('react');	
var ContactList = require("../orders/contact-list.jsx");	
var Reminders = require("./reminder.jsx");	

var addReminder = React.createClass({
	getInitialState: function () {
	    return {
	    	closeView: false,
	    	viewing: true,
	    	reminders:[{}],
	    	deletedReminders: ""
	    };
	},

	removeReminder : function (key) {
		
		if (this.state.reminders.length > 1) {

  			var deletedReminder = this.state.reminders.splice(key, 1);

	  		var newState = this.state.reminders;

  			this.setState({
    			reminders: newState,
    		});

  			if (deletedReminder[0].reminder_id) {
  				var newDeletedStrng = this.state.deletedReminders + ',' + deletedReminder[0].reminder_id;
  				
  				this.setState({
	    			deletedReminders: newDeletedStrng
	    		});
	
			}
		} 
	},

	addReminder : function (key) {
		
		var newReminder = {
			contact_id : this.props.reminder[0].contact_id
		}

		this.state.reminders.splice(key + 1, 0, newReminder);

		var newState = this.state.reminders;

  		this.setState({
    		reminders: newState
    	});
	},

	componentDidMount: function () {

		var reminder = this.props.reminder;

		this.setState({
			reminders: reminder
		})
	},

	render: function () {
		var reminders 		= this.state.reminders;
		var addReminder 	= this.addReminder;
		var removeReminder 	= this.removeReminder;
		return (
			<div className="overlay">
				<div className="column-12 push-2 model-generic model-top reminder create-order">
					<div className="panel-header">
						<h3>Reminders for {reminders[0].name}</h3>
						<a className="close" onClick={this.props.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action={"/reminders/" + this.state.deletedReminders.slice(1)} method="POST">
							<div className="row column-13 push-2 gutters small-margin-top">
								<div className="row column-11 gutters">
									<div className="column-7 purchase">
										<h4>Message</h4>
									</div>
									<div className="column-9 purchase">
										<h4>Date</h4>
									</div>
								</div>
								{reminders.map(function (reminder, i) {
									var key = new Date().getMilliseconds() + i;

									return 	<Reminders
												reminder = {reminder}
												key = {key}
												keys= {i} 
												addReminder={addReminder} 
												removeReminder={removeReminder}/>
								})}
									<input type="submit" className="button charcoal" value="Update" />
							</div>
						</form>
					</div>
				</div>
				{(this.state.closeView
                    ? <Close message="Do you want to close without saving?" closeView={this.closeView} closeWarning={this.closeWarning}/>
                    : <p></p>
                )}
			
			</div>
		);
	}
})

module.exports = addReminder;