/** @jsx React.DOM */

var React = require('react');
var Warning = require("../close-warning.jsx");	
var ContactList = require("../orders/contact-list.jsx");	

var addReminder = React.createClass({
	getInitialState: function() {
	    return {
	    	closeView: false,
	    	edited: false
	    };
	},

	closeView: function() {
		if(this.state.closeView || !this.state.edited){
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

	ifEdited: function() {
  		if (!this.state.edited) {
  			this.setState({
	  			edited: true
	  		})
  		}
  	},

	closeWarning: function () {
		this.setState({
	    	closeView: false
	    })
	},

	render: function() {
		var reminder 	= this.props.reminder;
		var edited 		= this.ifEdited;
		return (
			<div className="overlay">
				<div className="column-12 push-2 model-generic model-top reminder create-order">
					<div className="panel-header">
						<h3>New Entry</h3>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action="/reminders/post" method="POST">
							<div className="row gutters">
								<div>
									<div className="row">
										<div className="column-8">
											<p>Contact</p>
											<ContactList required={true} contact={reminder ? reminder.contact: ""} contactType="contact" handleChange={edited} />
										</div>
										<div className="column-8">
											<p>Reminder Date </p>
											<input type="date" name="date" defaultValue={reminder ? reminder.date : ""} onChange={edited} required />
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Quote</p>
											<input type="text" name="quote" defaultValue={reminder ? reminder.quote : ""} onChange={edited} />
										</div>	
										<div className="column-8">
											<p>Call</p>
											<input type="text" name="call"  defaultValue={reminder ? reminder.call : ""} onChange={edited}  />
										</div>				
									</div>
									
									<div className="row">
										
										<div className="column-8">
											<p>Remind</p>
											<input type="text" name="remind"  defaultValue={reminder ? reminder.call : ""} onChange={edited}  />
										</div>
										<div className="column-8">
											<p>Follow Up</p>
											<input type="text" name="follow_up"  defaultValue={reminder ? reminder.follow_up : ""} onChange={edited} />
										</div>
									</div>

									<input type="submit" className="button charcoal" value="Done" />
								</div>
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