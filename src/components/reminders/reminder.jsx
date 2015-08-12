var React = require('react');

var Reminder = React.createClass({

	render: function () {

		var reminder 		= this.props.reminder;
		var addReminder 	= this.props.addReminder;
		var removeReminder 	= this.props.removeReminder;
		var edited			= this.props.edited;
		var viewing			= this.props.viewing;

		return (
			<div >
				<div className="column-9">
					<div className="column-8">
						<input type="text" defaultValue={reminder.message} name="reminder_message" disabled={viewing ? true : false} onChange={edited.bind(null, this.props.keys)} required/>
					</div>
					<div className="column-8">
						<input type="date" defaultValue={reminder.date && reminder.date !== null ? reminder.date.substring(0, 10) : ''} disabled={viewing ? true : false} name="reminder_date" onChange={edited.bind(null, this.props.keys)} required/>
					</div>
					<input type="text" name="reminder_reminder_id" defaultValue= {reminder.reminder_id}  className="display-none" />
					<input type="text" name="reminder_contact_reminders_id" defaultValue= {reminder.contact_id}  className="display-none" />
				</div>
				<div className="column-3 push-1">
					<button type="button" className="button	blue add-row" onClick={addReminder.bind(null, this.props.keys)} disabled={viewing ? true : false}>+</button>
					<button type="button" className="button	blue add-row" onClick={removeReminder.bind(null, this.props.keys)} disabled={viewing ? true : false}>-</button>
				</div>
			</div>
		);
	}
})

module.exports = Reminder;
