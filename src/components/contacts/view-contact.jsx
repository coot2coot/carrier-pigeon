var React  			= require('react/addons');
var Router  		= require('react-router');
var Close 			= require("../close-warning.jsx");
var Warning 		= require("../warning.jsx");
var ViewReminders 	= require("../reminders/view-reminder.jsx");
var PContactList 	= require("./people-contact-list.jsx");


var viewOrder = React.createClass({
	getInitialState: function() {
      return {
        viewing: true,
        closeView: false,
        edited: false,
        deletedReminders: "",
        deletedPContacts: "",
        peopleContacts: [{}]
      };
    },


	componentWillMount: function () {

		var getContactUrl = "/people_contacts/" + this.props.contact[0].contact_id;

	    $.get(getContactUrl, function(result) {
	    	var peopleContacts = JSON.parse(result);
	    	

	    	if (peopleContacts.length > 0) { 
	    		console.log(peopleContacts)
		      	if (this.isMounted()) {
		        	this.setState({
		          		peopleContacts: peopleContacts
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {

	    	"get units request failed"
	    });
	},

	deleteHandler: function (item) {

		this.setState({
			deleteContact: item
		})
	},

	onCloseComponent: function () {
		this.setState({
			deletedContacts: false
		})
	}, 

    closeView: function() {
		if(this.state.closeView || this.state.viewing || !this.state.edited){
			this.props.closeView()
	    } else {
		    this.setState({
	    		closeView: true
	    	})
		}
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
	ifEdited: function () {

  		if (!this.state.edited) {
  			this.state.edited = true
  		}
  	},

  	deleteReminder: function (id) {

  		var deleteRem = id;

  		if (this.state.deletedReminders !== "") {
  			deleteRem = this.state.deletedReminders + ',' + id;
  		}
			
		this.setState({
			deletedReminders: deleteRem
		});
  	},

  	deletePContacts: function (id) {

  		newDeletedStrng = this.state.deletedPContacts + ',' + id;
			
		this.setState({
			deletedPContacts: newDeletedStrng
		});
  	},

	render: function() {

		var viewing = this.state.viewing;
		var state 	= this.state;
		var edited 	= this.ifEdited;
		var contact = this.props.contact[0];
		var reminders = this.props.contact;
		var deleteReminder = this.deleteReminder;

		return (

			<div className="overlay">
				<div>
					{( this.state.deleteContact
	                    ? <Warning message="Delete this contact?" contact={contact} url={"/contacts/delete/" + contact.contact_id} closeView={this.onCloseComponent}/>
	                    : <p></p>
	                )}
                </div>
				<div className="column-12 push-2 model-generic model-top view-order">
					<div className="panel-header">
						<a className="button blue" onClick={this.deleteHandler.bind(null, contact)}>Delete</a>
						<button className="button blue" onClick={this.edit}  >Edit</button>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action={"/contacts/edit/" + this.state.deletedReminders + "_" + this.state.deletedPContacts} method="POST">
							<input className="display-none" name="contact_id" defaultValue= {contact ? contact.contact_id : ""} onChange={edited}></input>
							<div className="row gutters">
								<div>

									<div className="row">
										<div className="column-5">
											<p>Company Name</p>
											<input type="text" name="company_name" defaultValue={contact ? contact.company_name : ""} disabled={viewing ? true : false} onChange={edited} required/>
										</div>
										<div className="column-5">
											<p>VAT </p>
											<input type="text" name="vat_number" defaultValue={contact ? contact.vat_number : ""} disabled={viewing ? true : false} onChange={edited}/>
										</div>
										<div className="column-6">
											<p>Category</p>
											<input type="text" name="category" defaultValue={contact ? contact.category : ""} disabled={viewing ? true : false} onChange={edited}/>
										</div>
									</div>

									<div className="row">
										<div className="column-10">
											<p>Address Line</p>
											<input type="text" name="address_line" defaultValue={contact ? contact.address_line : ""}disabled={viewing ? true : false} onChange={edited}/>
										</div>	
										<div className="column-6">
											<p>City</p>
											<input type="text" name="city"  defaultValue={contact ? contact.city : ""} disabled={viewing ? true : false} onChange={edited}/>
										</div>				
									</div>
									
									<div className="row">
										<div className="column-5">
											<p>County</p>
											<input type="text" name="county"  defaultValue={contact ? contact.county : ""} disabled={viewing ? true : false} onChange={edited} />
										</div>
										<div className="column-5">
											<p>Post Code</p>
											<input type="text" name="postcode"  defaultValue={contact ? contact.postcode : ""} disabled={viewing ? true : false} onChange={edited}/>
										</div>
										<div className="column-6">
											<p>Country</p>
											<input type="text" name="country"  defaultValue={contact ? contact.country : ""} disabled={viewing ? true : false} onChange={edited} />
										</div>
									</div>

									<PContactList 
										edit={edited} 
										viewing={viewing} 
										deletePContacts= {this.deletePContacts}
										contactId = {contact ? contact.contact_id : ''}
										contacts={state.peopleContacts}/>
									
									<div className="row">
										<div className="column-16">
											<p>Remarks</p>
											<textarea type="text" className="small" name="remarks" defaultValue={contact ? contact.remarks : ""} disabled={viewing ? true : false} max="500" onChange={edited}/>
										</div>
										
										</div>
									<div className="row">
										<div className="column-16">
											<p>Sales Report</p>
											<textarea className="big" max="500" name="sales_report" defaultValue={contact ? contact.sales_report : ""} disabled={viewing ? true : false} onChange={edited}/>
										</div>
									</div>
									<div className="row">
										<div className="column-16">
											<p>Reminders</p>
										</div>
									</div>
									<ViewReminders 
										edited={edited} 
										reminder={reminders} 
										viewing={viewing} 
										deleteReminder={deleteReminder}
										contactId={contact ? contact.contact_id : ""}/>
									{!viewing 
										?<input type="submit" className="button charcoal" value="Done" />
										:<p></p>
									}
									
								</div>
							</div>	
						</form>
					</div>
				</div>	
				{( this.state.closeView 
                    ?<Close message="Do you want to close without saving?"  closeView={this.closeView} closeWarning={this.closeWarning}/>
                    : <p></p>
                )}			
			</div>
		);
	}
})

module.exports = viewOrder;