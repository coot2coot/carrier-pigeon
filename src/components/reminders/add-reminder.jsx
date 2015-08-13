var React 		= require('react');		
var Reminders 	= require("./reminder-add.jsx");

var addReminder = React.createClass({
	getInitialState: function () {
		
	    return {
	    	reminders:[]
	    };
	},

	removeReminder : function (key) {

		var reminders;
		
		if (this.state.reminders.length > 0) {
			reminders = this.state.reminders

			reminders.splice(key, 1);

  			this.setState({
    			reminders: reminders,
    		});
		} 
	},

  	onReminderChange: function (key, event) {

		var name = event.target.name;
		var name = name.substring(9, name.length)
		var value = event.target.value;
		this.state.reminders[key][name] = value;
	},

	addReminder : function (key) {
		
		var newReminder = {};

		this.state.reminders.splice(key + 1, 0, newReminder);

		var newState = this.state.reminders;

  		this.setState({
    		reminders: newState
    	});
	},

	render: function () {

		var reminders 			= this.state.reminders;
		var addReminder 		= this.addReminder;
		var removeReminder 		= this.removeReminder;
		var onReminderChange	= this.onReminderChange;

		return (
			<div className="reminder create-order">
				<div className="row column-16 push-1 gutters small-margin-top">
					<div className="row column-11 gutters">
						<div className="column-7 purchase">
							<h4>Message</h4>
						</div>
						<div className="column-9 purchase">
							<h4>Date</h4>
						</div>
					</div>
					{reminders.length > 0 
						? reminders.map(function (reminder, i) {
							var key = new Date().getMilliseconds() + i;

							return 	<Reminders
										reminder = {reminder}
										edited = {onReminderChange}
										key = {key}
										keys= {i} 
										addReminder={addReminder} 
										removeReminder={removeReminder}/>
						})
						: <button type="button" className="button blue add-row wide" onClick={addReminder.bind(null, 0)}>Add A Reminder</button>
					}
				</div>	
			</div>
		);
	}
})

module.exports = addReminder;
