/** @jsx React.DOM */

var React = require('react');
var Warning = require("../close-warning.jsx");	
var DataList = require("../orders/data-list.jsx");	

var addReminder = React.createClass({
	getInitialState: function() {
	    return {
	    	closeView: false,
	    	viewing: true
	    };
	},

	closeView: function() {
    	if (this.state.viewing) {
    		this.props.closeView()
			this.setState({
	    		closeView: false
	    	})
    	}
		if(this.state.closeView){
			this.props.closeView()
			this.setState({
	    		closeView: false
	    	})
	    }else{
		    this.setState({
	    		closeView: true
	    	})
		}
	},
	deleteHandler: function (item) {
		this.setState({
			deleteContact: item
		})
	},

	closeWarning: function () {
		this.setState({
	    	closeView: false
	    })
	},
	edit: function () {
		if(this.state.viewing === true){
			this.setState({
				viewing: false
			});
		} else {
			this.setState({
				viewing: true
			});
		}
	},


	render: function() {
		var reminder 	= this.props.reminder;
		var viewing = this.state.viewing;
		return (
			<div className="overlay">
				<div className="column-12 push-2 model-generic model-top reminder create-order">
					<div className="panel-header">
						<h3>New Entry</h3>
						<button className="button blue" onClick={this.edit} >Edit</button>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action="/reminders/edit/" method="POST">
							<div className="row gutters">
									<input className="display-none" name="reminder_id" defaultValue= {reminder ? reminder.reminder_id : ""}></input>
									<div className="row">	
										<div className="column-8">
											<p>Contact</p>
											<DataList contacts={this.props.contacts} contact={reminder ? reminder.contact: ""} vieworder = {viewing ? true : false}  contactType="contact" />
										</div>
										<div className="column-8">
											<p>Reminder Date </p>
											<input type="date" name="date" defaultValue={reminder ? reminder.date.substring(0, 10) : ""}required  disabled={viewing ? true : false}/>
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Quote</p>
											<input type="text" name="quote" defaultValue={reminder ? reminder.quote : ""}   disabled={viewing ? true : false}/>
										</div>	
										<div className="column-8">
											<p>Call</p>
											<input type="text" name="call"  defaultValue={reminder ? reminder.call : ""}    disabled={viewing ? true : false}/>
										</div>				
									</div>
									
									<div className="row">
										
										<div className="column-8">
											<p>Remind</p>
											<input type="text" name="remind"  defaultValue={reminder ? reminder.call : ""}   disabled={viewing ? true : false} />
										</div>
										<div className="column-8">
											<p>Follow Up</p>
											<input type="text" name="follow_up"  defaultValue={reminder ? reminder.follow_up : ""}  disabled={viewing ? true : false} />
										</div>
									</div>

									<input type="submit" className="button charcoal" value="Done" />
							</div>
						</form>
					</div>
				</div>
				{(this.state.closeView
                    ? <Warning message="Do you want to close without saving?" closeView={this.closeView} closeWarning={this.closeWarning}/>
                    : <p></p>
                )}
			
			</div>
		);
	}
})

module.exports = addReminder;